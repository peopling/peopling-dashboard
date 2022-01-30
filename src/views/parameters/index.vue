/* eslint-disable padded-blocks */
<template>
  <div class="app-container">
      <el-empty description="" v-if="isEmpty"></el-empty>
      <el-button
          type="success"
          icon="el-icon-plus"
          @click="createMode()"
        >
      </el-button>
    <el-table :data="gridData" style="width: 100%" v-if="!isEmpty">
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
          <el-button
            type="danger"
            icon="el-icon-minus"
            @click="deleteRow(row, index)"
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
            :type="row.key === 'Integer' ? 'primary' : 'danger'"
            slot="content"
          >
            {{ row.key === "Integer" ? "Integer" : "String" }}
          </el-tag>

          <template slot="edit-component-slot">
            <el-option value="Integer" label="Integer"></el-option>
            <el-option value="String" label="String"></el-option>
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

private isEmpty = false

 private gridData = [
   {
     value: 'user Managment',
     key: 'Integer'
   },
   {
     value: 'user Managment',
     key: 'Integer'
   },
   {
     value: 'bütçe',
     key: 'String'
   },
   {
     value: 'param Value Test',
     key: 'String'
   },
   {
     value: 'param Value Test 1',
     key: 'String'
   }
 ]

 createMode() {
   this.gridData.push({
     value: ' ',
     key: 'String'
   })
 }

 setEditMode(row: { editMode: boolean }, index: any) {
   row.editMode = true
 }

 saveRow(row: { editMode: boolean }, index: any) {
   row.editMode = false
 }

 deleteRow(row: { editMode: boolean }, index: any) {
   this.$notify({
     title: 'Success',
     message: 'Delete Successfully',
     type: 'success',
     duration: 2000
   })
   this.gridData.splice(index, 1)

   if (this.gridData.length === 0) {
     this.isEmpty = true
   }
 }

 mounted() {
   this.gridData = this.gridData.map((row: any) => {
     if (this.gridData.length === 0) {
       this.isEmpty = true
     }
     return {
       ...row,
       editMode: false
     }
   })
 }
}
</script>
