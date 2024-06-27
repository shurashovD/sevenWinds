export type EntityChild = Entity[] | [null]

export type Entity = {
  child: EntityChild
  equipmentCosts: number
  estimatedProfit: number
  id: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  parentId: number | null
  rowName: string
  salary: number
  supportCosts: number
  total: number
}

export type CreateRowInEntity = Omit<Entity, 'id'>

export type UpdateRowInEntity = Omit<Entity, 'id' | 'parentId'>

export type EntityMutationResponse = { changed: EntityChild; current: Entity | null }

type EntytyFieldsKeys = Pick<
  Entity,
  'equipmentCosts' | 'estimatedProfit' | 'overheads' | 'rowName' | 'salary'
>

export type EntityForm = Record<Partial<keyof EntytyFieldsKeys>, string>

type EntityColumns = Record<Partial<keyof EntytyFieldsKeys> | 'level', string>
type ColumnConfig = { width: string }
type EntityColumnsConfig = Record<Partial<keyof EntityColumns>, ColumnConfig>

export const ENTITY_FORM_LABELS: EntityForm = {
  rowName: 'Наименование работ',
  salary: 'Основная з/п',
  equipmentCosts: 'Оборудование',
  overheads: 'Накладные расходы',
  estimatedProfit: 'Сметная прибыль',
}

export const ENTITY_COLUMNS: EntityColumns = {
  level: 'Уровень',
  ...ENTITY_FORM_LABELS,
}

export const ENTITY_COLUMNS_CONFIG: EntityColumnsConfig = {
  equipmentCosts: { width: '20%' },
  estimatedProfit: { width: '20%' },
  level: { width: '20%' },
  overheads: { width: '20%' },
  rowName: { width: '20%' },
  salary: { width: '20%' },
}

export const MENU_ITEMS = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  'СМР',
  'График',
  'МиМ',
  'Рабочие',
  'Капвложения',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты',
]
