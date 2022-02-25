import faker from 'faker'
import { Response, Request } from 'express'
import { Details, IVariableData } from '../src/api/types'

const variableList: IVariableData [] = []
const details: Details [] = []

variableList.push(
  {
    title: 'Çıplak Maaş',
    type: 'variable',
    key: 'ciplak-maas',
    parent: '1',
    parenttype: 'Company',
    details: [
      {
        key: 'çiplak-maas-deger',
        title: 'Çıplak Maas Değer',
        type: 'percent',
        value: '50',
        includeSgk: true,
        isToWorkRate: true,
        anyRezerv: true
      }
    ]
  })

export const getVariables = (req: Request, res: Response) => {
// const { } = req.query

  return res.json({
    code: 20000,
    data: {
      items: variableList
    }
  })
}

export const createVariable = (req: Request, res: Response) => {
  const { variable } = req.body

  variableList.push(variable)
  return res.json({
    code: 20000,
    data: {
      variable
    }
  })
}

export const updateVariable = (req: Request, res: Response) => {
  const { key } = req.params
  const { variable } = req.body
  for (const v of variableList) {
    if (v.key.toString() === key) {
      return res.json({
        code: 20000,
        data: {
          variable
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Variable not found'
  })
}

export const deleteVariable = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
