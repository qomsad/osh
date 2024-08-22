import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, wrap } from "@mikro-orm/postgresql";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PaginatedDto } from "../../../shared/pagination/dto/paginated.dto";
import { QueryPageDto } from "../../../shared/pagination/dto/query-page.dto";
import { requestPage } from "../../../shared/pagination/helpers/request-page";
import { VariantService } from "../variant.service";
import { LearningCreateDto } from "./dto/learning-create.dto";
import { LearningDto } from "./dto/learning.dto";
import { Learning } from "./entity/learning.entity";

@Injectable()
export class LearningService {
  constructor(
    @InjectRepository(Learning)
    private readonly repository: EntityRepository<Learning>,
    private readonly variantService: VariantService,
  ) {}

  public async get(
    variantId: string,
    query: QueryPageDto,
  ): Promise<PaginatedDto<LearningDto>> {
    const qb = this.repository
      .createQueryBuilder("l")
      .select("l.*")
      .andWhere({ variant: { id: variantId } });
    return await requestPage(qb, query, ["name"]);
  }

  public async getObject(variantId: string, id: string): Promise<Learning> {
    const entity = await this.repository.findOne({
      variant: { id: variantId },
      id,
    });
    if (!entity) {
      throw new NotFoundException(
        `Не найден обучающий материал с идентификатором ${id} ` +
          `в варианте с идентификатором ${variantId}`,
      );
    }
    return entity;
  }

  public async getById(variantId: string, id: string): Promise<LearningDto> {
    return await this.getObject(variantId, id);
  }

  public async create(
    variantId: string,
    dto: LearningCreateDto,
  ): Promise<LearningDto> {
    const { files, ...learning } = dto;
    const variant = await this.variantService.getObject(variantId);

    const entity = this.repository.create({
      ...learning,
      files: Array.from(files),
      variant,
    });
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async update(
    variantId: string,
    id: string,
    dto: LearningCreateDto,
  ): Promise<LearningDto> {
    const entity = await this.getObject(variantId, id);
    const { files, ...learning } = dto;
    const variant = await this.variantService.getObject(variantId);

    wrap(entity).assign({ ...learning, variant, files: Array.from(files) });

    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async delete(variantId: string, id: string): Promise<void> {
    const entity = await this.getObject(variantId, id);
    await this.repository.getEntityManager().removeAndFlush(entity);
  }
}
