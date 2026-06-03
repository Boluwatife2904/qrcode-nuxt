<script setup lang="ts">
export interface PropRow {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

interface Props {
  rows: PropRow[]
}

defineProps<Props>()
</script>

<template>
  <div class="pt-wrap">
    <table class="pt">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td class="pt-name">
            <code>{{ row.name }}</code>
            <span v-if="row.required" class="req" title="Required">*</span>
          </td>
          <td class="pt-type"><code>{{ row.type }}</code></td>
          <td class="pt-default">
            <code v-if="row.default !== undefined">{{ row.default }}</code>
            <span v-else class="dash">—</span>
          </td>
          <td class="pt-desc">{{ row.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.pt-wrap {
  overflow-x: auto;
  margin: 24px 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.pt {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

th {
  text-align: left;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: var(--muted);
  background: rgba(255,255,255,.025);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

td {
  padding: 11px 16px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
  line-height: 1.55;
}
tr:last-child td { border-bottom: none; }
tr:hover td { background: rgba(128,128,128,.04); }

.pt-name code {
  font-family: var(--font-code);
  font-size: 13px;
  color: var(--prop-name-color);
  background: none;
  padding: 0;
  border: none;
}

.req {
  color: var(--prop-req-color);
  margin-left: 3px;
  font-size: 14px;
  line-height: 1;
}

.pt-type code {
  font-family: var(--font-code);
  font-size: 12.5px;
  color: var(--prop-type-color);
  background: var(--inline-bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 1px 5px;
  white-space: nowrap;
}

.pt-default code {
  font-family: var(--font-code);
  font-size: 12.5px;
  color: var(--prop-dflt-color);
  background: var(--inline-bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 1px 5px;
  white-space: nowrap;
}
.dash { color: var(--muted); }

.pt-desc { color: var(--prop-desc-color); max-width: 340px; }
</style>
