import { Router } from 'express'

interface iController {
  path: string
  router: Router
}

export default iController
