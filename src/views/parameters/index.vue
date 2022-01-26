/* eslint-disable padded-blocks */
<template>
  <div class="app-container">
      <el-empty description="" v-if="false"></el-empty>
       <el-button
            type="success"
            icon="el-icon-check"
            @click="createMode()"
          >
          </el-button>
      <el-tooltip
      content="Click on any of the cells or on the edit button to edit content"
    >
      <i style="" class="el-icon-info"></i>
    
    </el-tooltip>
    <el-table :data="gridData" style="width: 100%">
      <el-table-column label="Operations" min-width="180">
        <template slot-scope="{row, index}">
          <el-button icon="el-icon-edit" @click="setEditMode(row, index)">
          </el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            @click="saveRow(row, index)"
          >
          </el-button>
        </template>
      </el-table-column>

      <el-table-column min-wwidth="150" label="Key">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          editable-component="el-select"
          close-event="change"
          v-model="row.key"
        >
          <el-tag
            size="medium"
            :type="row.key === 'M' ? 'primary' : 'danger'"
            slot="content"
          >
            {{ row.key === "M" ? "Male" : "Female" }}
          </el-tag>

          <template slot="edit-component-slot">
            <el-option value="M" label="Male"></el-option>
            <el-option value="F" label="Female"></el-option>
          </template>
        </editable-cell>
      </el-table-column>

      <el-table-column label="Value" min-width="180">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          v-model="row.value"
        >
          <span slot="content">{{ row.value }}</span>
        </editable-cell>
      </el-table-column>
    </el-table>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditableCell from './components/EditableCell.vue'

@Component({
  name: 'parameters',
  components: {
    EditableCell
  }
})
// eslint-disable-next-line padded-blocks
export default class extends Vue {

 private gridData = [
   {
     value: 'Tom',
     key: 'M'
   },
   {
     value: 'Lisa',
     key: 'F'
   },
   {
     value: 'Jon',
     key: 'M'
   },
   {
     value: 'Mary',
     key: 'F'
   }
 ]

 createMode() {
   this.gridData.push({
     value: ' ',
     key: ' '
   })
 }

 setEditMode(row: { editMode: boolean }, index: any) {
   row.editMode = true
 }

 saveRow(row: { editMode: boolean }, index: any) {
   row.editMode = false
 }

 mounted() {
   this.gridData = this.gridData.map((row: any) => {
     return {
       ...row,
       editMode: false
     }
   })
 }
}
</script>
