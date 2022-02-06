import faker from 'faker'
import { Response, Request } from 'express'
import { IUserData } from '../src/api/types'

const userList: IUserData[] = [
  {
    id: 0,
    username: 'developer-admin',
    password: 'any',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['developer-admin'],
    status: 'active'
  },
  {
    id: 1,
    username: 'editor',
    password: 'any',
    name: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890111',
    roles: ['editor'],
    status: 'passive'
  },
  {
    id: 2,
    username: 'peopling-admin',
    password: 'any',
    name: 'peopling Admin User',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a peopling administrator',
    email: 'peopling@test.com',
    phone: '1234567890',
    roles: ['peopling-admin'],
    status: 'active'
  }
]
const userCount = 10

for (let i = 3; i < userCount; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.random.alphaNumeric(9),
    password: faker.random.alphaNumeric(20),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    roles: ['visitor'],
    status: faker.random.arrayElement(['active', 'passive', 'deleted'])
  })
}

export const register = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const login = (req: Request, res: Response) => {
  const { username } = req.body
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          accessToken: username + '-token'
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const logout = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const getUsers = (req: Request, res: Response) => {
  const { name, status, page = 1, limit = 20, sort } = req.query

  let users = userList.filter(user => {
    const lowerCaseName = user.name.toLowerCase()
    if (status && user.status !== status) return false
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
  })

  if (sort === '-id') {
    users = userList.reverse()
  }

  const pageList = users.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

  return res.json({
    code: 20000,
    data: {
      total: pageList.length,
      items: pageList
    }
  })
}

export const createUser = (req: Request, res: Response) => {
  const { user } = req.body
  userList.push(user)
  return res.json({
    code: 20000,
    data: {
      user
    }
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({
    code: 20000,
    data: {
      user: req.header('X-Access-Token') === 'developer-admin-token' ? userList[0] : (req.header('X-Access-Token') === 'peopling-admin-token' ? userList[2] : userList[1])
    }
  })
}

export const getUserByName = (req: Request, res: Response) => {
  const { username } = req.params
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const updateUser = (req: Request, res: Response) => {
  const { username } = req.params
  const { user } = req.body
  for (const v of userList) {
    if (v.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const deleteUser = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
