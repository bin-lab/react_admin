// 导入React、react-markdown-editor-lite，以及一个你喜欢的Markdown渲染器
import * as React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';

// 注册插件（如果有的话）
// MdEditor.use(YOUR_PLUGINS_HERE);

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

// 完成！
function handleEditorChange({html, text}) {
    console.log('handleEditorChange', html, text)
}
export default (props) => {
    return (
        <MdEditor
            value=""
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
        />
    )
}
