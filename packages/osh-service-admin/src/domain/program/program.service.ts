import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, wrap } from "@mikro-orm/postgresql";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Meta } from "../../shared/embedded/model/meta.embeddable";
import { PaginatedDto } from "../../shared/pagination/dto/paginated.dto";
import { requestPage } from "../../shared/pagination/helpers/request-page";
import { SpecialtyService } from "../specialty/specialty.service";
import { ProgramCreateDto } from "./dto/program-create.dto";
import { ProgramDto } from "./dto/program.dto";
import { ProgramQueryPageDto } from "./dto/query-program.dto";
import { Program } from "./entity/program.entity";

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly repository: EntityRepository<Program>,
    private readonly specialtyService: SpecialtyService,
  ) {}

  public async get(
    query: ProgramQueryPageDto,
  ): Promise<PaginatedDto<ProgramDto>> {
    const qb = this.repository
      .createQueryBuilder("p")
      .leftJoinAndSelect("p.specialty", "sp");
    if (query.specialtyId) {
      qb.andWhere({ specialty: { id: query.specialtyId } });
    }
    return await requestPage(qb, query, ["name"]);
  }

  public async getObject(id: string): Promise<Program> {
    const entity = await this.repository.findOne(
      { id },
      { populate: ["specialty"] },
    );
    if (!entity) {
      throw new NotFoundException(
        `Не найдена программа с идентификатором ${id}`,
      );
    }
    return entity;
  }

  public async getById(id: string): Promise<ProgramDto> {
    return await this.getObject(id);
  }

  public async create(dto: ProgramCreateDto): Promise<ProgramDto> {
    const { specialtyId, ...program } = dto;
    const specialty = await this.specialtyService.getObject(specialtyId);

    const entity = this.repository.create({
      ...program,
      specialty,
      meta: new Meta(),
    });
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async update(id: string, dto: ProgramCreateDto): Promise<ProgramDto> {
    const entity = await this.getObject(id);
    const { specialtyId, ...program } = dto;
    const specialty = await this.specialtyService.getObject(specialtyId);

    wrap(entity).assign({ ...program, specialty });

    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async delete(id: string): Promise<void> {
    const entity = await this.getObject(id);
    await this.repository.getEntityManager().removeAndFlush(entity);
  }
}
