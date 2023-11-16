<template>
  <table>
    <thead>
      <tr>
        <th v-for="(column) in columns" :key="column.dataIndex">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <TRow v-for="(record) in resource" :key="record.id">
        <TCell v-for="(column) in columns" :key="column.dataIndex">
          <slot :name="column.dataIndex" :data="record[column.dataIndex]" :record="record" :field="column.dataIndex">
            {{ record[column.dataIndex] }}
          </slot>
        </TCell>
      </TRow>
    </tbody>
  </table>
</template>

<script>

import TRow from '@/components/TRow.vue'
import TCell from '@/components/TCell.vue'
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    resource: {
      type: Array,
      required: true
    }
  },
  components: {
    TRow,
    TCell
  }
}
</script>