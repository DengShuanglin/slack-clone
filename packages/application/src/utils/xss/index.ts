import * as xss from 'xss'

function handleXss(content: string) {
  // 设置HTML过滤器的白名单
  const options = {
    whiteList: {
      p: ['class', 'style'],
      em: ['class', 'style'],
      strong: ['class', 'style'],
      br: ['class', 'style'],
      u: ['class', 'style'],
      s: ['class', 'style'],
      blockquote: ['class', 'style'],
      li: ['class', 'style'],
      ol: ['class', 'style'],
      ul: ['class', 'style'],
      h1: ['class', 'style'],
      h2: ['class', 'style'],
      h3: ['class', 'style'],
      h4: ['class', 'style'],
      h5: ['class', 'style'],
      h6: ['class', 'style'],
      span: ['class', 'style'],
      div: ['class', 'style'],
      img: ['src', 'class', 'style', 'width']
    }
  }
  // 自定义规则
  const myxss = new xss.FilterXSS(options)
  // 直接调用 myxss.process() 即可
  content = myxss.process(content)
  return content
}
