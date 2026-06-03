import { addComponent, addImports, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Component name used by Nuxt auto-imports. Set to false to disable.
   *
   * @default 'VueQRCode'
   */
  componentName?: string | false
  /**
   * Also register the component as <QrcodeNuxt />.
   *
   * @default true
   */
  registerAlias?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'qrcode-nuxt',
    configKey: 'qrcodeNuxt',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    componentName: 'VueQRCode',
    registerAlias: true,
  },
  setup(options) {
    const resolver = createResolver(import.meta.url)
    const filePath = resolver.resolve('./runtime/components/VueQRCode.vue')

    if (options.componentName) {
      addComponent({
        name: options.componentName,
        filePath,
      })
    }

    if (options.registerAlias && options.componentName !== 'QrcodeNuxt') {
      addComponent({
        name: 'QrcodeNuxt',
        filePath,
      })
    }

    addImports({
      name: 'useQrcode',
      as: 'useQrcode',
      from: resolver.resolve('./runtime/composables/useQrcode'),
    })
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    qrcodeNuxt?: ModuleOptions
  }

  interface NuxtOptions {
    qrcodeNuxt?: ModuleOptions
  }
}
