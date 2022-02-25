/* eslint-disable padded-blocks */
<template>
  <div class="app-container">
      <el-button
          type="success"
          icon="el-icon-plus"
          key="new-parameter"
          title="parametre oluştur"
          @click="handleCreate()"
        > Yeni Parametre
      </el-button>
      <el-empty description="" v-if="isEmpty"></el-empty>
    <el-table
      :data="list"
      style="width: 100%"
      v-loading="listLoading"
      v-if="!isEmpty"
      highlight-current-row>
      <el-table-column label="Operations" min-width="180">
        <template slot-scope="{row, $index}">
          <el-button
            icon="el-icon-edit"
            v-if="!row.editMode"
            @click="setEditMode(row, $index)">
          </el-button>
          <el-button
            v-if="row.editMode"
            type="success"
            icon="el-icon-check"
            @click="saveRow(row, $index)">
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-minus"
            @click="deleteRow(row, $index)">
          </el-button>
        </template>
      </el-table-column>

      <el-table-column min-width="150" label="parameter">
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          editable-component="el-select"
          close-event="change"
          v-model="row.title">
          <el-tag
            size="medium"
            type="primary"
            slot="content">
            {{ row.title }}
          </el-tag>

          <template slot="edit-component-slot">
            <el-option
            v-for="item in parameterOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
          </template>
        </editable-cell>
      </el-table-column>

      <el-table-column min-width="100" label="year">
        <editable-cell
          v-if="row.key !== 'cost-center'"
          :show-input="row.editMode"
          slot-scope="{row}"
          editable-component="el-select"
          close-event="change"
          v-model="row.year">
           <el-tag
           size="medium"
            type="primary"
            slot="content"> {{ row.year }}</el-tag>
          <template slot="edit-component-slot">
            <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item"
          />
          </template>
        </editable-cell>
      </el-table-column>
      <el-table-column label="Detail" min-width="180">
        <el-button>Detay</el-button>
      </el-table-column>
    </el-table>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditableCell from './components/EditableCell.vue'
import { cloneDeep } from 'lodash'
import { getParameters, defaultParameterData, getParameter, updateParameter, createParameter, deleteParameter } from '@/api/parameters'
import { IParameterData } from '@/api/types'

@Component({
  name: 'parameters',
  components: {
    EditableCell
  }
})

// eslint-disable-next-line padded-blocks
export default class extends Vue {

  private list: IParameterData[] = []
  private isEmpty = false
  private editMode = false
  private total = 0
  private listLoading = true
  private listQuery = {
    key: undefined,
    year: undefined
  }

  private yearList = this.years()

  private dialogFormVisible = false

  private tempParameterData = defaultParameterData

 private parameterOptions = [{ key: 'sgk-parameter', name: 'sgk parametreleri' }, { key: 'cost-center', name: 'Masraf Merkezi' }, { key: 'hourly-work', name: 'Saatlik çalışma' }]

 private async createData() {
   const parameterData = this.tempParameterData
   parameterData.type = 'parameter'
   const { data } = await createParameter({ parameter: parameterData })
   this.list.unshift(data.user)
   this.dialogFormVisible = false

   this.$notify({
     title: 'success',
     message: 'Create Successfully',
     type: 'success',
     duration: 2000
   })
 }

 created() {
   this.getAllList()
 }

 private resettempParameterData() {
   this.tempParameterData = cloneDeep(defaultParameterData)
 }

 private handleCreate() {
   this.resettempParameterData()
   this.list.push(defaultParameterData)
   // this.dialogFormVisible = true
 }

 private async getAllList() {
   this.listLoading = true
   const { data } = await getParameters(this.listQuery)
   console.log(data)
   this.list = data.items
   this.total = data.total
   // Just to simulate the time of the request
   setTimeout(() => {
     this.listLoading = false
   }, 0.5 * 1000)
 }

 setEditMode(row: { editMode: boolean, key: string }, index: any) {
   console.log(row, index)
   if (row.key === 'cost-center') {
     this.editMode = false
   } else {
     row.editMode = true
   }
 }

 saveRow(row: { editMode: boolean, key: string, title: string, year: string }, index: any) {
   console.log(row, index)
   this.list = this.list.map((param: any) => {
     if (param.key === row.key) {
       param.key = row.key
       param.title = row.title
       param.year = row.year
     }
     return {
       ...param,
       editMode: false
     }
   })
 }

 deleteRow(row: { editMode: boolean }, index: any) {
   this.$notify({
     title: 'Success',
     message: 'Delete Successfully',
     type: 'success',
     duration: 2000
   })

   console.log(row)
   this.list.splice(index, 1)

   if (this.list.length === 0) {
     this.isEmpty = true
   }
 }

 mounted() {
   this.list = this.list.map((row: any) => {
     if (this.list.length === 0) {
       this.isEmpty = true
     }
     return {
       ...row,
       editMode: this.editMode
     }
   })
 }

 private years() {
   const year = new Date().getFullYear()
   return Array.from({ length: year - 1900 }, (value, index) => 1901 + index).reverse().map(x => { return x.toString() })
 }
}
</script>
