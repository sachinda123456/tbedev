import { ITBAddOnObject, TBInitAddOn } from '@taskbuddy/add-on'
console.log('loading my Taskbuddy Review Typescripted add-on...')

TBInitAddOn({
  name: 'Job Reviews',
  id: 'c5ndeu59aacjmf4ksd30',
  impressions: [
    {
      name: 'home-screen',
      renderFunc: async (tbapi) => {
        const user = await tbapi.activeUser()
        if (user.user_type === 'admin' || user.user_type === 'super_admin') {
          const data = await tbapi.getStorage('account', user.account_id, 'job-reviews', 'all')
          const avg =
            Math.round(
              (data.reviewedJobs.reduce((acc, curr) => acc + curr.rating, 0) /
                data.reviewedJobs.length) *
                10
            ) / 10
          return {
            objects: [
              {
                id: 'review-rating-label',
                type: 'label',
                title: 'You have ' + data.reviewedJobs.length + ' job ratings',
              },
              {
                id: 'review-avg-rating',
                type: 'icon-label',
                title: '' + avg + ' in average',
                icon: 'https://taskbuddy-add-on-example.netlify.app/' + Math.round(avg) + '.png',
              },
              {
                id: 'review-btn',
                type: 'button',
                onClick: async (tbapi) => {
                  await tbapi.webView(
                    'Your reviews',
                    'https://taskbuddy-add-on-example.netlify.app/all-feedback.html'
                  )
                },
                title: 'See reviews',
              },
            ],
          }
        }
        return { objects: [] }
      },
    },
    {
      name: 'job-screen',
      renderFunc: async (tbapi) => {
        let job: any = undefined
        let user: any = undefined
        let objects: ITBAddOnObject[] = []
        try {
          job = await tbapi.activeJob()
          user = await tbapi.activeUser()
          if (user.user_type === 'client') {
            objects = [
              ...objects,
              {
                id: 'review-btn',
                type: 'button',
                onClick: async (tbapi) => {
                  await tbapi.webView(
                    'Job feedback',
                    'https://taskbuddy-add-on-example.netlify.app/feedback.html'
                  )
                },
                title: 'Send feedback',
              },
            ]
          } else if (user.user_type !== 'worker') {
            try {
              const data = await tbapi.getStorage('job', job.id, 'job-review', 'all')
              let iconlabel: ITBAddOnObject[] = []
              if (data.rating) {
                iconlabel = [
                  {
                    id: 'review-rating',
                    type: 'icon-label',
                    title: '' + data.rating,
                    icon: 'https://taskbuddy-add-on-example.netlify.app/' + data.rating + '.png',
                  },
                ]
              }
              objects = [
                ...objects,
                ...iconlabel,
                {
                  id: 'review-btn',
                  type: 'button',
                  onClick: async (tbapi) => {
                    await tbapi.webView(
                      'Job feedback',
                      'https://taskbuddy-add-on-example.netlify.app/feedback.html'
                    )
                  },
                  title: 'View feedback',
                },
              ]
            } catch (err) {}
          }
        } catch (err) {
          console.log(err)
        }
        return {
          objects,
        }
      },
    },
    {
      name: 'config-screen',
      renderFunc: async (tbapi) => {
        let settings = {}
        let account
        try {
          account = await tbapi.activeAccount()
          settings = await tbapi.getStorage('account', account.id, 'app-settings', 'admins')
        } catch (err) {
          console.log(err)
        }
        console.log('App settings:', settings)
        return {
          objects: [
            {
              id: 'my-label1',
              type: 'label',
              title: settings['my-test-input'] !== undefined ? settings['my-test-input'] : 'Badge',
            },
            {
              id: 'my-badge',
              type: 'badge',
              color: settings['my-select'] === 'green' ? 'green' : 'red',
              label: settings['my-select'] === 'green' ? '👍' : '👎',
            },
            {
              id: 'my-label2',
              type: 'label',
              title: 'Markdown text',
            },
            {
              id: 'my-md',
              type: 'markdown-text',
              placeholder: 'Some long text',
              value:
                settings['my-md'] !== undefined
                  ? settings['my-md']
                  : `
# Title
and some text

## Sub title
and som other text
            `,
              onChange: async (tbapi, value) => {
                await tbapi.setStorage('account', account.id, 'app-settings', 'admins', {
                  ...settings,
                  ...{
                    'my-md': value,
                  },
                })
                tbapi.reRender()
              },
            },
            {
              id: 'my-label3',
              type: 'label',
              title: 'Select',
            },
            {
              id: 'my-select',
              type: 'select',
              options: [
                { value: 'green', label: 'Tumme upp!' },
                { value: 'red', label: 'Tumme ner...' },
              ],
              placeholder: 'Select up or down',
              value: settings['my-select'] !== undefined ? settings['my-select'] : 'green',
              onChange: async (tbapi, value) => {
                await tbapi.setStorage('account', account.id, 'app-settings', 'admins', {
                  ...settings,
                  ...{
                    'my-select': value,
                  },
                })
                tbapi.reRender()
              },
            },
            {
              id: 'my-label4',
              type: 'label',
              title: 'Switch',
            },
            {
              id: 'my-switch',
              type: 'switch',
              title: 'onoff',
              value: settings['my-switch'] !== undefined ? settings['my-switch'] : true,
              onChange: async (tbapi, value) => {
                await tbapi.setStorage('account', account.id, 'app-settings', 'admins', {
                  ...settings,
                  ...{
                    'my-switch': value,
                  },
                })
                tbapi.reRender()
              },
            },
            {
              id: 'my-label5',
              type: 'label',
              title: 'Multi select',
            },
            {
              id: 'my-multi-select',
              type: 'multi-select',
              options: [
                { value: '1', label: 'First' },
                { value: '2', label: 'Second' },
              ],
              placeholder: 'Select first or second',
              values:
                settings['my-multi-select'] !== undefined ? settings['my-multi-select'] : ['1'],
              onChange: async (tbapi, value) => {
                await tbapi.setStorage('account', account.id, 'app-settings', 'admins', {
                  ...settings,
                  ...{
                    'my-multi-select': value,
                  },
                })
                tbapi.reRender()
              },
            },
            {
              id: 'my-label6',
              type: 'label',
              title: 'Text input',
            },
            {
              id: 'my-test-input',
              type: 'text-input',
              placeholder: 'input your text',
              value:
                settings['my-test-input'] !== undefined ? settings['my-test-input'] : 'Hej ehj',
              onChange: async (tbapi, value) => {
                await tbapi.setStorage('account', account.id, 'app-settings', 'admins', {
                  ...settings,
                  ...{
                    'my-test-input': value,
                  },
                })
                tbapi.reRender()
              },
            },
          ],
        }
      },
    },
  ],
})
