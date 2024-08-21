import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, wrap } from "@mikro-orm/postgresql";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { Meta } from "../../shared/embedded/model/meta.embeddable";
import { PaginatedDto } from "../../shared/pagination/dto/paginated.dto";
import { requestPage } from "../../shared/pagination/helpers/request-page";
import { SpecialtyService } from "../specialty/specialty.service";
import { SpecialistQueryPageDto } from "./dto/query-specialist.dto";
import { SpecialistCreateDto } from "./dto/specialist-create.dto";
import { SpecialistUpdateDto } from "./dto/specialist-update.dto";
import { SpecialistDto } from "./dto/specialist.dto";
import { Specialist } from "./entity/specialist.entity";

export class SpecialistService {
  constructor(
    @InjectRepository(Specialist)
    private readonly repository: EntityRepository<Specialist>,
    private readonly specialtyService: SpecialtyService,
  ) {}

  public async get(
    query: SpecialistQueryPageDto,
  ): Promise<PaginatedDto<SpecialistDto>> {
    const qb = this.repository
      .createQueryBuilder("s")
      .leftJoinAndSelect("s.specialty", "sp")
      .join("s.specialty", "sp");
    if (query.specialtyId) {
      qb.andWhere({ specialty: { id: query.specialtyId } });
    }
    return await requestPage(qb, query, [
      "serviceNumber",
      "firstName",
      "lastName",
      "middleName",
    ]);
  }

  public async getObject(id: string): Promise<Specialist> {
    const entity = await this.repository.findOne(
      { id },
      { populate: ["specialty"] },
    );
    if (!entity) {
      throw new NotFoundException(
        `Не найден специалист с идентификатором ${id}`,
      );
    }
    return entity;
  }

  public async getById(id: string): Promise<SpecialistDto> {
    return this.getObject(id);
  }

  public async create(dto: SpecialistCreateDto): Promise<SpecialistDto> {
    const { specialtyId, login, ...specialist } = dto;
    const specialty = await this.specialtyService.getObject(specialtyId);

    const checkLogin = await this.repository.find({ login });
    if (checkLogin.length > 0) {
      throw new ConflictException("Специалист с таким логином уже существует");
    }

    const entity = this.repository.create({
      ...specialist,
      login,
      specialty,
      meta: new Meta(),
    });
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async update(
    id: string,
    dto: SpecialistUpdateDto,
  ): Promise<SpecialistDto> {
    const entity = await this.getObject(id);
    const { specialtyId, login, ...specialist } = dto;

    const checkLogin = await this.repository.find({ login });
    if (checkLogin.length > 0) {
      throw new ConflictException("Специалист с таким логином уже существует");
    }

    wrap(entity).assign({ ...specialist, login });
    if (specialtyId) {
      const specialty = await this.specialtyService.getObject(specialtyId);
      wrap(entity).assign({ specialty });
    }
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async delete(id: string): Promise<void> {
    const entity = await this.getObject(id);
    this.repository.getEntityManager().removeAndFlush(entity);
  }
}
