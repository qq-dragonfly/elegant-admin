/*
 * @Description:
 * @Author: zhangyao
 * @Date: 2024-06-03 08:42:54
 * @LastEditTime: 2024-06-11 18:57:28
 * @LastEditors: zhangyao
 */
// 注册element-plus ui
import {
  ElCollapse,
  ElCollapseItem,
  ElFormItem,
  ElTabPane,
  ElTabs,
} from 'element-plus'
import { type PluginManager, pluginManager as pManager } from '../../utils'
import Text from './text'
import Input from './input'
import Textarea from './textarea'
import InputNumber from './input-number'
import Form from './form'
import FormItem from './formItem'
import Button from './button'
import Card from './card'
import Row from './row'
import Col from './col'
import Select from './select'
import Radio from './radio'
import Checkbox from './checkbox'
import Slider from './slider'
import ColorPicker from './color-picker'
import Switch from './switch'
import Cascader from './cascader'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import DatePicker from './date-picker'
import UploadFile from './upload-file'
import UploadImage from './upload-image'
import Modal from './modal'

export function setupElementPlus(
  pluginManager: PluginManager = pManager,
): void {
  pluginManager.component('FormItem', ElFormItem)
  pluginManager.component('Tabs', ElTabs)
  pluginManager.component('TabPane', ElTabPane)
  pluginManager.component('Collapse', ElCollapse)
  pluginManager.component('CollapseItem', ElCollapseItem)

  const componentArray = [
    Text,
    Form,
    FormItem,
    Input,
    Textarea,
    InputNumber,
    Radio,
    Checkbox,
    DatePicker,
    Select,
    Switch,
    ColorPicker,
    Cascader,
    Slider,
    UploadFile,
    UploadImage,
    Button,
    Card,
    Row,
    Col,
    Collapse,
    CollapseItem,
    Modal,
  ]

  componentArray.forEach((item: any) => {
    pluginManager.registerComponent(item)
    pluginManager.addBaseComponentTypes(item.defaultSchema.type)
  })

  // ui初始化完成。
  pluginManager.setInitialized(true)
}

/**
 * 设置element GlobalConfig
 */
export function provideGlobalConfig(args: any) {
  import('element-plus').then(({ provideGlobalConfig }) => {
    provideGlobalConfig(args)
  })
}
