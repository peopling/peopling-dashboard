import faker from 'faker'
import { Response, Request } from 'express'
import { asyncRoutes, constantRoutes, asyncPeoplingRoutes } from './routes'
import { IRoleData } from '../../src/api/types'

const routes = [...constantRoutes, ...asyncRoutes, ...asyncPeoplingRoutes]
const roles: IRoleData[] = [
  {
    key: 'developer-admin',
    name: 'developer-admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission') // Just a mock
  },
  {
    key: 'peopling-admin',
    name: 'peopling-admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: asyncPeoplingRoutes // Just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

export const getRoles = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      total: roles.length,
      items: roles
    }
  })
}

export const createRole = (req: Request, res: Response) => {
  const { role } = req.body
  role.key = faker.datatype.number({ min: 3, max: 10000 })
  roles.push(role)
  return res.json({
    code: 20000,
    data: {
      key: role.key
    }
  })
}

export const updateRole = (req: Request, res: Response) => {
  const { role } = req.body

  for (let index = 0; index < roles.length; index++) {
    if (roles[index].key === role.key) {
      roles.splice(index, 1, Object.assign({}, role))
      return res.json({
        code: 20000,
        data: {
          role
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Employee not found'
  })
}

export const deleteRole = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const getRoutes = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      routes
    }
  })
}
