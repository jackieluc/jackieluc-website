export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'gatsby',
      options: {
        sites: [
          {
            siteUrl: 'https://www.gatsbyjs.com/dashboard/342583ae-d3a5-4ed8-94f6-b875e8fa4cb7/sites/51c73764-e2cd-47f0-8c50-d15c87bc8385/production'
          }
        ]
      }
    },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                // {
                //   buildHookId: '5e5c4e710f8528e07c45448a',
                //   title: 'Sanity Studio',
                //   name: 'jackieluc-website-studio',
                //   apiId: 'e53ef859-e41e-491e-a8dd-9c6f92c75d7f'
                // },
                {
                  buildHookId: '5e5c4e710f8528c1194547a9',
                  title: 'Blog Website',
                  name: 'jackieluc-website',
                  apiId: 'cc2d07f7-2708-4105-b3ca-ce8077624418'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub Repo',
            value: 'https://github.com/jackieluc/jackieluc-website',
            category: 'Code'
          },
          {
            title: 'Website',
            value: 'https://jackieluc-website.netlify.com',
            category: 'apps'
          }
        ]
      },
      layout: {
        width: 'large',
        height: 'large'
      }
    },
    {
      name: 'document-list',
      options: {
        title: 'Recent blog posts',
        order: '_createdAt desc',
        types: ['post']
      },
      layout: {
        width: 'medium',
        height: 'large'
      }
    },
    {
      name: 'project-users',
      layout: { height: 'auto' }
    }
  ]
}
