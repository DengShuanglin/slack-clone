## API

| 属性          | 类型              | 默认值   | 说明                                                  |
| :----------- | :------          | :------- | :---------------------------------------------------- |
| type         | string           | 'text'   | 类型，可选值 `text`、`number`、`password`              |
| value        | string           | -        | 值                                                    |
| fontSize     | string、number    | -        | 字体大小                                                   |
| width        | string、number    | -        | 输入框框度                                                   |
| height       | string、number    | -        | 输入框高度                                                   |
| borderRadius | string、number    | -        | 输入框圆角                                                   |
| placeholder  | string           | -        | 提示语                                                    |
| disabled     | boolean          | false    | 是否禁用                                              |
| showIcon     | boolean          | false    | 是否显示icon                                              |
| maxLength    | number           | -        | 输入字数上限                                          |
| onChangeEvent | (e?: React.ChangeEvent&lt;HTMLInputElement&gt;) => void | -  | 输入框变化时的回调函数  |
