import faker from 'faker'
import { Response, Request } from 'express'
import { IParameterData, Details } from '../src/api/types'

const parameterList: IParameterData [] = []
const details: Details [] = []

parameterList.push({
  title: 'sgk parametreleri',
  key: 'sgk-parameter',
  parent: faker.datatype.number({ min: 1, max: 1000 }).toString(),
  type: 'parameter',
  parenttype: 'Company',
  year: '2021',
  details: [{
    key: 'issizlik-orani',
    title: 'işsizlik oranı',
    type: 'percent',
    value: '2,00'
  },
  {
    key: 'sgk-orani',
    title: 'sgk oranı',
    type: 'percent',
    value: '15,50'
  },
  {
    key: 'sgk-tavanı-ocak',
    title: 'sgk tavanı ocak',
    type: 'money',
    value: '1500'
  }]
},
{
  title: 'Saatlik çalışma',
  type: 'parameter',
  key: 'hourly-work',
  year: '2021',
  parent: '1',
  parenttype: 'Company',
  details: [
    {
      key: 'ocak',
      title: 'Ocak',
      type: 'monay',
      value: '2000'
    },
    {
      key: 'subat',
      title: 'Şubat',
      type: 'monay',
      value: '2000'
    }
  ]
},
{
  title: 'Masraf Merkezi',
  type: 'parameter',
  key: 'cost-center',
  parent: '1',
  parenttype: 'Company',
  details: [
    {
      key: 'masraf-merkezi-no',
      title: 'Masraf Merkezi',
      type: 'text',
      value: 'teststring'
    },
    {
      key: 'masraf-merkezi-grubu',
      title: 'Masraf Merkezi Grubu',
      type: 'text',
      value: 'teststring'
    }
  ]
})

export const getParameters = (req: Request, res: Response) => {
// const { } = req.query

  return res.json({
    code: 20000,
    data: {
      items: parameterList
    }
  })
}

export const createParameter = (req: Request, res: Response) => {
  const { parameter } = req.body

  parameterList.push(parameter)
  return res.json({
    code: 20000,
    data: {
      parameter
    }
  })
}

export const updateParameter = (req: Request, res: Response) => {
  const { key } = req.params
  const { parameter } = req.body
  for (const v of parameterList) {
    if (v.key.toString() === key) {
      return res.json({
        code: 20000,
        data: {
          parameter
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'parameter not found'
  })
}

export const deleteParameter = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
