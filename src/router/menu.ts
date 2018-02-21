import _ from 'lodash'

class AdminMenu {
  routeName: string
  title: string
  icon: string
  order: number
  children: Array<AdminMenu>

  constructor(routeName: string, title: string, icon: string, order = 0) {
    this.routeName = routeName
    this.title = title
    this.icon = icon
    this.order = order
    this.children = new Array()
  }

  setChildre(children: Array<AdminMenu>) {
    this.children = children
  }
}

export function generateMenuList(routes): Array<AdminMenu> {
  let returnVal: AdminMenu[] = new Array()
  if (!routes) return returnVal
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
            let adminMenu = new AdminMenu(routeName, menuTitle, menuIcon, menuOrder)
            let sChildren = _.get(children[j],'children', false)
            adminMenu.setChildre(generateMenuList(sChildren))
            returnVal.push(adminMenu)
          }
        }
      }
    }
  }
  return returnVal
}
