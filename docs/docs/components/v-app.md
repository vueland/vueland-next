# v-app

```vue

<v-app>
  <router-view v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <Suspense>
        <template #default>
          <div>
            <component :is="Component" />
          </div>
        </template>
        <template #fallback>
          <span>loading...</span>
        </template>
      </Suspense>
    </transition>
  </router-view>
</v-app>
```