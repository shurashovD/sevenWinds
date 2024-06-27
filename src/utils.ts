import { CreateRowInEntity, Entity, EntityChild, EntityForm, UpdateRowInEntity } from './constants'

export function entityFormToCreateRowInEntity(
  entityForm: EntityForm,
  parentId: number | null,
): CreateRowInEntity {
  return {
    child: [null],
    equipmentCosts: +entityForm.equipmentCosts,
    estimatedProfit: +entityForm.estimatedProfit,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    parentId,
    overheads: +entityForm.overheads,
    rowName: entityForm.rowName,
    salary: +entityForm.salary,
    supportCosts: 0,
    total: 0,
  }
}

export function entityFormToUpdateRowInEntity(entityForm: EntityForm): UpdateRowInEntity {
  return {
    child: [null],
    equipmentCosts: +entityForm.equipmentCosts,
    estimatedProfit: +entityForm.estimatedProfit,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: +entityForm.overheads,
    rowName: entityForm.rowName,
    salary: +entityForm.salary,
    supportCosts: 0,
    total: 0,
  }
}

export function entityFormFromEntity(entity: Entity | null): EntityForm {
  return {
    equipmentCosts: entity?.equipmentCosts?.toString() || '0',
    estimatedProfit: entity?.estimatedProfit?.toString() || '0',
    overheads: entity?.overheads?.toString() || '0',
    rowName: entity?.rowName || '',
    salary: entity?.salary?.toString() || '0',
  }
}

export function findByIdInEntitiesTree(entityChild: EntityChild, id: number): Entity | null {
  for (let i = 0; i < entityChild?.length || 0; ++i) {
    const entity = entityChild[i]
    if (entity?.id === id) {
      return entity
    }

    if (entity?.child) {
      const result = findByIdInEntitiesTree(entity.child, id)
      if (result) {
        return result
      }
    }
  }

  return null
}

export function mutateFlatFieldsInEntitesTree(entityChild: EntityChild, entity: Entity): boolean {
  const cursor = findByIdInEntitiesTree(entityChild, entity.id)
  if (cursor) {
    Object.entries(entity)
      .filter(([key]) => key !== 'child')
      .map(([key, value]) => {
        cursor![key as keyof Entity] = value as never
      })
    return true
  } else {
    return false
  }
}
