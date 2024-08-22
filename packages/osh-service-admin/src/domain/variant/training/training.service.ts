import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, wrap } from "@mikro-orm/postgresql";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PaginatedDto } from "../../../shared/pagination/dto/paginated.dto";
import { QueryPageDto } from "../../../shared/pagination/dto/query-page.dto";
import { requestPage } from "../../../shared/pagination/helpers/request-page";
import { VariantService } from "../variant.service";
import { TrainingCreateDto } from "./dto/training-create.dto";
import { TrainingDto } from "./dto/training.dto";
import { Training } from "./entity/training.entity";

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly repository: EntityRepository<Training>,
    private readonly variantService: VariantService,
  ) {}

  public async get(
    variantId: string,
    query: QueryPageDto,
  ): Promise<PaginatedDto<TrainingDto>> {
    const qb = this.repository
      .createQueryBuilder("t")
      .select("t.*")
      .andWhere({ variant: { id: variantId } });
    return await requestPage(qb, query, ["question"]);
  }

  public async getObject(variantId: string, id: string): Promise<Training> {
    const entity = await this.repository.findOne({
      variant: { id: variantId },
      id,
    });
    if (!entity) {
      throw new NotFoundException(
        `Не найден вопрос с идентификатором ${id} ` +
          `в варианте с идентификатором ${variantId}`,
      );
    }
    return entity;
  }

  public async getById(variantId: string, id: string): Promise<TrainingDto> {
    return await this.getObject(variantId, id);
  }

  public async create(
    variantId: string,
    dto: TrainingCreateDto,
  ): Promise<TrainingDto> {
    const { answers, ...training } = dto;
    const variant = await this.variantService.getObject(variantId);

    const entity = this.repository.create({
      ...training,
      answers: Array.from(answers),
      variant,
    });
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async update(
    variantId: string,
    id: string,
    dto: TrainingCreateDto,
  ): Promise<TrainingDto> {
    const entity = await this.getObject(variantId, id);
    const { answers, ...training } = dto;
    const variant = await this.variantService.getObject(variantId);

    wrap(entity).assign({ ...training, variant, answers: Array.from(answers) });

    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async delete(variantId: string, id: string): Promise<void> {
    const entity = await this.getObject(variantId, id);
    await this.repository.getEntityManager().removeAndFlush(entity);
  }
}
