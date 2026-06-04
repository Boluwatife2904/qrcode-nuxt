<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'qrcode-nuxt',
  description: 'The ultimate customizable QR code generator for Vue & Nuxt',
})

// A simplified QR-like grid used purely as decoration
const cells: boolean[] = [
  true,true,true,true,true,true,true, false,true,false,true,false,false,
  true,false,false,false,false,false,true, false,false,true,true,false,false,
  true,false,true,true,true,false,true, false,true,false,false,true,false,
  true,false,true,true,true,false,true, false,false,true,true,false,true,
  true,false,true,true,true,false,true, false,true,false,false,true,false,
  true,false,false,false,false,false,true, false,false,true,false,false,true,
  true,true,true,true,true,true,true, false,true,false,true,false,false,
  false,false,false,false,false,false,false, false,true,true,false,true,false,
  true,false,true,true,false,true,true, false,false,true,false,false,true,
  false,true,false,false,true,false,true, false,true,false,true,true,false,
  true,true,false,true,true,false,false, false,false,true,false,true,true,
  false,false,true,false,false,true,false, false,true,true,true,false,false,
  true,false,false,true,false,false,true, false,true,false,true,true,true,
]
</script>

<template>
  <div
    :style="{
      display: 'flex',
      width: '1200px',
      height: '630px',
      backgroundColor: '#09090c',
      overflow: 'hidden',
      position: 'relative',
    }"
  >
    <!-- Subtle grid texture top-right -->
    <div
      :style="{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '340px',
        height: '340px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        opacity: '0.18',
      }"
    >
      <div
        v-for="(on, i) in cells"
        :key="i"
        :style="{
          width: '18px',
          height: '18px',
          borderRadius: '3px',
          backgroundColor: on ? '#10b981' : 'transparent',
        }"
      />
    </div>

    <!-- Bottom-left decorative arc -->
    <div
      :style="{
        position: 'absolute',
        bottom: '-120px',
        left: '-120px',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        border: '1.5px solid rgba(16,185,129,0.15)',
      }"
    />
    <div
      :style="{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        border: '1.5px solid rgba(16,185,129,0.1)',
      }"
    />

    <!-- Main content -->
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 88px',
        gap: '0px',
        flex: 1,
      }"
    >
      <!-- Badge -->
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '28px',
        }"
      >
        <div
          :style="{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
          }"
        />
        <span
          :style="{
            color: '#10b981',
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontFamily: 'Inter',
          }"
        >
          qrcode-nuxt
        </span>
      </div>

      <!-- Title -->
      <div
        :style="{
          fontSize: title === 'qrcode-nuxt' ? '84px' : '56px',
          fontWeight: '800',
          color: '#ffffff',
          lineHeight: '1.05',
          letterSpacing: '-0.01em',
          fontFamily: 'Inter',
          marginBottom: '24px',
        }"
      >
        {{ title }}
      </div>

      <!-- Description -->
      <div
        :style="{
          fontSize: '24px',
          color: '#7a8a9e',
          fontWeight: '400',
          lineHeight: '1.55',
          maxWidth: '640px',
          fontFamily: 'Inter',
          marginBottom: '44px',
        }"
      >
        {{ description }}
      </div>

      <!-- Tags row -->
      <div :style="{ display: 'flex', gap: '10px' }">
        <div
          v-for="tag in ['SVG Output', 'TypeScript', 'SSR Ready', 'Auto-imports']"
          :key="tag"
          :style="{
            backgroundColor: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.25)',
            color: '#6ee7b7',
            fontSize: '13px',
            fontWeight: '600',
            padding: '7px 16px',
            borderRadius: '6px',
            fontFamily: 'Inter',
          }"
        >
          {{ tag }}
        </div>
      </div>
    </div>

    <!-- Right: large QR preview box -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '320px',
        flexShrink: 0,
        marginRight: '72px',
      }"
    >
      <div
        :style="{
          display: 'flex',
          flexWrap: 'wrap',
          width: '200px',
          gap: '4px',
          opacity: '0.7',
        }"
      >
        <div
          v-for="(on, i) in cells"
          :key="i"
          :style="{
            width: '13px',
            height: '13px',
            borderRadius: '2px',
            backgroundColor: on ? '#10b981' : 'rgba(16,185,129,0.06)',
          }"
        />
      </div>
    </div>
  </div>
</template>
