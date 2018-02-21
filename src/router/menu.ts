import routes from './routes'
import _ from 'lodash'

class AdminMenu {
  routeName: string
  title: string
  icon: string
  order: number

  constructor(routeName: string, title: string, icon: string, order = 0) {
    this.routeName = routeName
    this.title = title
    this.icon = icon
    this.order = order
  }
}

export function generateMenuList(): Array<AdminMenu> {
  let returnVal: AdminMenu[] = new Array()
  for (let i = 0; i <= routes.length; i++) {
    if (_.get(routes[i], 'meta.adminMenu', false)) {
      const children = _.get(routes[i], 'children', false)
      if (children) {
        for (let j = 0; j <= children.length; j++) {
          const routeName = _.get(children[j], 'name', false)
          const menuTitle = _.get(children[j], 'meta.menuTitle', false)
          const menuIcon = _.get(children[j], 'meta.menuIcon', '')
          const menuOrder = _.get(children[j], 'meta.menuOrder', 0)
          if (routeName && menuTitle) {
            returnVal.push(new AdminMenu(routeName, menuTitle, menuIcon, menuOrder))
          }
        }
      }
    }
  }
  return returnVal
}
