import React from 'react'
import { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import {
  notificationProvider,
  RefineThemes,
  ThemedLayout,
} from '@refinedev/mantine'
import routerProvider, {
  UnsavedChangesNotifier,
} from '@refinedev/nextjs-router'

import dataProvider from '@refinedev/nestjsx-crud'
import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks'
import { Header } from '@components/header'
import { API_URL, BACKOFFICE_ROOT, BACKOFFICE_PAGES } from 'src/constants'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />
    }

    return (
      <ThemedLayout Header={Header}>
        <Component {...pageProps} />
      </ThemedLayout>
    )
  }

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <>
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          {/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
          <MantineProvider
            theme={{ ...RefineThemes.Blue, colorScheme: colorScheme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: 'auto' } }} />
            <NotificationsProvider position="top-right">
              <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                notificationProvider={notificationProvider}
                resources={[
                  {
                    name: `${BACKOFFICE_PAGES.BLOG_POSTS_EP}`,
                    list: `${BACKOFFICE_ROOT}/${BACKOFFICE_PAGES.BLOG_POSTS}`,
                    create: `${BACKOFFICE_ROOT}/${BACKOFFICE_PAGES.BLOG_POSTS}/create`,
                    edit: `${BACKOFFICE_ROOT}/${BACKOFFICE_PAGES.BLOG_POSTS}/edit/:id`,
                    show: `${BACKOFFICE_ROOT}/${BACKOFFICE_PAGES.BLOG_POSTS}/show/:id`,
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: `${BACKOFFICE_PAGES.CATEGORIES}`,
                    list: `${BACKOFFICE_ROOT}/${BACKOFFICE_PAGES.CATEGORIES}`,
                    create: `${BACKOFFICE_ROOT}/${BACKOFFICE_PAGES.CATEGORIES}/create`,
                    edit: `${BACKOFFICE_ROOT}/${BACKOFFICE_PAGES.CATEGORIES}/edit/:id`,
                    show: `${BACKOFFICE_ROOT}/${BACKOFFICE_PAGES.CATEGORIES}/show/:id`,
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                {renderComponent()}
                <RefineKbar />
                <UnsavedChangesNotifier />
              </Refine>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </>
  )
}

export default MyApp
