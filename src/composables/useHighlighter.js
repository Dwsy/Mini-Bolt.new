import { ref } from "vue";

export function useHighlighter() {
  // 语言对应的关键词映射
  const languageKeywords = {
    javascript: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "async",
      "await",
      "try",
      "catch",
      "switch",
      "case",
      "default",
      "break",
      "continue",
      "this",
      "new",
      "typeof",
      "instanceof",
      "null",
      "undefined",
      "true",
      "false",
    ],
    python: [
      "def",
      "class",
      "import",
      "from",
      "return",
      "if",
      "elif",
      "else",
      "for",
      "while",
      "try",
      "except",
      "with",
      "as",
      "lambda",
      "True",
      "False",
      "None",
      "and",
      "or",
      "not",
      "in",
      "is",
      "pass",
      "raise",
      "self",
      "yield",
      "assert",
      "del",
      "global",
      "nonlocal",
      "finally",
    ],
    html: [
      "<!DOCTYPE",
      "<html",
      "</html>",
      "<head",
      "</head>",
      "<body",
      "</body>",
      "<div",
      "</div>",
      "<span",
      "</span>",
      "<p",
      "</p>",
      "<h1",
      "</h1>",
      "<script",
      "</script>",
      "<style",
      "</style>",
      "<a",
      "</a>",
      "<img",
      "<br",
      "<ul",
      "</ul>",
      "<li",
      "</li>",
      "<input",
      "<button",
      "<form",
      "<table",
      "<tr",
      "<td",
      "<th",
      "<section",
      "<nav",
      "<footer",
      "<header",
    ],
    css: [
      "body",
      "div",
      "span",
      "class",
      "id",
      "margin",
      "padding",
      "color",
      "background",
      "font-size",
      "display",
      "position",
      "width",
      "height",
      "@media",
      "@keyframes",
      "animation",
      "transition",
      "transform",
      "border",
      "flex",
      "grid",
      "content",
      "justify-content",
      "align-items",
    ],
    vue: [
      "template",
      "script",
      "style",
      "v-if",
      "v-else",
      "v-for",
      "v-model",
      "v-on",
      "v-bind",
      "v-show",
      "v-text",
      "v-html",
      "v-once",
      "v-pre",
      "v-cloak",
      "ref",
      "computed",
      "watch",
      "methods",
      "data",
      "props",
      "emits",
      "components",
      "setup",
    ],
  };

  // 定义日间和夜间主题的颜色配置
  const lightThemeColors = {
    background: "#f8f8f8",
    foreground: "#333333",
    keyword: "#0000ff", // 蓝色，关键词
    string: "#a31515", // 红色，字符串
    number: "#098658", // 绿色，数字
    comment: "#008000", // 绿色，注释
    operator: "#666666", // 灰色，操作符
    function: "#795e26", // 棕色，函数
    property: "#267f99", // 青色，属性
    type: "#267f99", // 青色，类型
    variable: "#0070c1", // 蓝色，变量
    tag: "#800000", // 暗红色，HTML标签
    attribute: "#ff0000", // 红色，HTML属性
  };

  const darkThemeColors = {
    background: "#1e1e1e",
    foreground: "#d4d4d4",
    keyword: "#569cd6", // 蓝色，关键词
    string: "#ce9178", // 橙色，字符串
    number: "#b5cea8", // 浅绿色，数字
    comment: "#6a9955", // 绿色，注释
    operator: "#d4d4d4", // 灰色，操作符
    function: "#dcdcaa", // 黄色，函数
    property: "#9cdcfe", // 浅蓝色，属性
    type: "#4ec9b0", // 青色，类型
    variable: "#9cdcfe", // 蓝色，变量
    tag: "#569cd6", // 蓝色，HTML标签
    attribute: "#9cdcfe", // 浅蓝色，HTML属性
  };

  // 根据系统主题选择颜色
  const isDarkMode = ref(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // 添加主题变化监听
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        isDarkMode.value = event.matches;
      });
  }

  // 获取当前主题的颜色
  const getThemeColors = () => {
    // 检查document.documentElement是否有特定的主题类，这样可以覆盖系统主题
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains("dark")) {
      return darkThemeColors;
    } else if (htmlEl.classList.contains("light")) {
      return lightThemeColors;
    }

    // 否则使用系统主题
    return isDarkMode.value ? darkThemeColors : lightThemeColors;
  };

  // 特殊符号和操作符正则表达式
  const operatorsRegex = /([=(){}\[\]<>,.;:?+\-*/\\&|^!%]+)/g;
  const stringRegex = /(["'`].*?["'`])/g;
  const multiLineStringRegex = /(["'`][\s\S]*?["'`])/g;
  const commentRegex = /(\/\/.*|\/\*[\s\S]*?\*\/|#.*)/g;
  const numberRegex = /\b(\d+(\.\d+)?)\b/g;
  const htmlTagRegex = /(&lt;[\w\/!].*?&gt;)/g;
  const htmlAttrRegex = /\s(\w+)=/g;
  const functionRegex = /\b([a-zA-Z_$][\w$]*)\s*\(/g;

  // 转义HTML特殊字符
  const escapeHtml = (str) => {
    if (!str) return "";

    return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // 高亮代码函数
  const highlightCode = (code, language) => {
    if (!code) return "";

    // 获取当前主题颜色
    const colors = getThemeColors();

    // 转义HTML特殊字符
    let highlighted = escapeHtml(code);

    // 高亮注释（优先处理，避免干扰其他规则）
    highlighted = highlighted.replace(
      commentRegex,
      (match) => `<span style="color: ${colors.comment}">${match}</span>`
    );

    // 高亮字符串
    if (
      language === "javascript" ||
      language === "python" ||
      language === "html" ||
      language === "css" ||
      language === "vue"
    ) {
      highlighted = highlighted.replace(
        stringRegex,
        (match) => `<span style="color: ${colors.string}">${match}</span>`
      );
    } else {
      // 对于可能有多行字符串的语言使用不同的正则
      highlighted = highlighted.replace(
        multiLineStringRegex,
        (match) => `<span style="color: ${colors.string}">${match}</span>`
      );
    }

    // 高亮数字
    highlighted = highlighted.replace(
      numberRegex,
      (match, p1) => `<span style="color: ${colors.number}">${p1}</span>`
    );

    // 高亮函数调用
    highlighted = highlighted.replace(
      functionRegex,
      (match, p1) => `<span style="color: ${colors.function}">${p1}</span>(`
    );

    // 处理HTML标签和属性
    if (language === "html" || language === "vue") {
      highlighted = highlighted.replace(
        htmlTagRegex,
        (match) => `<span style="color: ${colors.tag}">${match}</span>`
      );
      highlighted = highlighted.replace(
        htmlAttrRegex,
        (match, p1) => ` <span style="color: ${colors.attribute}">${p1}</span>=`
      );
    }

    // 高亮操作符
    highlighted = highlighted.replace(
      operatorsRegex,
      (match, p1) => `<span style="color: ${colors.operator}">${p1}</span>`
    );

    // 根据语言高亮关键词
    const keywordsToUse = [];
    if (language) {
      // 添加语言特定的关键词
      if (languageKeywords[language.toLowerCase()]) {
        keywordsToUse.push(...languageKeywords[language.toLowerCase()]);
      }

      // 对于Vue文件，也要添加JavaScript的关键词
      if (language === "vue") {
        keywordsToUse.push(...languageKeywords["javascript"]);
      }
    }

    // 应用关键词高亮
    keywordsToUse.forEach((keyword) => {
      // 使用\b确保只匹配单词边界
      const regex = new RegExp(`\\b(${keyword})\\b`, "g");
      highlighted = highlighted.replace(
        regex,
        (match, p1) => `<span style="color: ${colors.keyword}">${p1}</span>`
      );
    });

    // 使用pre标签包裹，保持格式
    return `<pre class="code-highlight" style="background-color: ${colors.background}; color: ${colors.foreground}; padding: 1em; border-radius: 4px; overflow-x: auto; line-height: 1.5; font-family: 'Fira Code', Consolas, 'Courier New', monospace;">${highlighted}</pre>`;
  };

  // Markdown简易高亮
  const highlightMarkdown = (markdown) => {
    if (!markdown) return "";

    // 获取当前主题颜色
    const colors = getThemeColors();

    // 转义HTML特殊字符
    let highlighted = escapeHtml(markdown);

    // 处理代码块 (需要在其他规则之前处理)
    highlighted = highlighted.replace(
      /\`\`\`(\w*)\n([\s\S]*?)\`\`\`/g,
      (match, language, code) => {
        const highlightedCode = highlightCode(code, language);
        return `<div style="color: ${colors.foreground}; margin: 1em 0;">
        <div style="color: ${colors.comment}; margin-bottom: 0.5em;">\`\`\`${language}</div>
        ${highlightedCode}
        <div style="color: ${colors.comment}; margin-top: 0.5em;">\`\`\`</div>
      </div>`;
      }
    );

    // 处理行内代码
    highlighted = highlighted.replace(
      /`([^`]+)`/g,
      (match, p1) =>
        `<code style="color: ${colors.string}; background-color: rgba(0,0,0,0.1); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace;">\`${p1}\`</code>`
    );

    // 处理标题
    highlighted = highlighted.replace(
      /^(#{1,6}\s.+)$/gm,
      (match) =>
        `<div style="color: ${colors.keyword}; font-weight: bold; margin: 0.5em 0;">${match}</div>`
    );

    // 处理粗体
    highlighted = highlighted.replace(
      /\*\*(.*?)\*\*/g,
      (match, p1) =>
        `<strong style="color: ${colors.function}; font-weight: bold;">**${p1}**</strong>`
    );

    // 处理斜体
    highlighted = highlighted.replace(
      /\*(.*?)\*/g,
      (match, p1) =>
        `<em style="color: ${colors.string}; font-style: italic;">*${p1}*</em>`
    );

    // 处理链接
    highlighted = highlighted.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, p1, p2) =>
        `[<span style="color: ${colors.string};">${p1}</span>](<span style="color: ${colors.keyword};">${p2}</span>)`
    );

    // 处理列表
    highlighted = highlighted.replace(
      /^(\s*[-*+]\s.+)$/gm,
      (match) =>
        `<div style="color: ${colors.function}; margin: 0.2em 0;">${match}</div>`
    );

    // 处理引用
    highlighted = highlighted.replace(
      /^(\s*>\s.+)$/gm,
      (match) =>
        `<div style="color: ${colors.comment}; border-left: 3px solid ${colors.comment}; padding-left: 1em; margin: 0.5em 0;">${match}</div>`
    );

    // 处理水平线
    highlighted = highlighted.replace(
      /^(\s*[-*_]{3,}\s*)$/gm,
      () =>
        `<hr style="border: none; border-top: 1px solid ${colors.operator}; margin: 1em 0;">`
    );

    return `<div class="markdown-highlight" style="background-color: ${colors.background}; color: ${colors.foreground}; padding: 1em; border-radius: 4px; overflow-x: auto; line-height: 1.5;">${highlighted}</div>`;
  };

  // 自动检测语言并高亮
  const highlight = (content, language) => {
    if (!content) return "";

    // 如果指定了语言，使用对应的高亮方式
    if (language) {
      if (language === "markdown" || language === "md") {
        return highlightMarkdown(content);
      } else {
        return highlightCode(content, language);
      }
    }

    // 自动检测是否为Markdown
    const mdPatterns = ["##", "*", "-", "```", ">", "[", "![", "==="];
    const hasMdPattern = mdPatterns.some((pattern) =>
      content.includes(pattern)
    );

    // 如果包含多个Markdown特有的标记，则判定为Markdown
    let mdScore = 0;
    mdPatterns.forEach((pattern) => {
      if (content.includes(pattern)) mdScore++;
    });

    // 根据检测结果选择高亮方式
    return mdScore >= 2 || (hasMdPattern && content.includes("\n\n"))
      ? highlightMarkdown(content)
      : highlightCode(content, guessLanguage(content));
  };

  // 根据内容特征猜测编程语言
  const guessLanguage = (content) => {
    if (!content) return "javascript"; // 默认返回javascript

    // 特征计数
    const counts = {
      javascript: 0,
      python: 0,
      html: 0,
      css: 0,
      vue: 0,
    };

    // JavaScript特征
    if (
      content.includes("function") ||
      content.includes("const ") ||
      content.includes("let ")
    )
      counts.javascript += 3;
    if (content.includes("=>")) counts.javascript += 3;
    if (content.includes("var ")) counts.javascript += 2;
    if (content.includes("import ") && content.includes("from "))
      counts.javascript += 2;
    if (content.includes("export ")) counts.javascript += 2;
    if (content.includes("this.")) counts.javascript += 1;
    if (content.includes("null") || content.includes("undefined"))
      counts.javascript += 1;
    if (content.includes("{") && content.includes("}")) counts.javascript += 1;

    // Python特征
    if (content.includes("def ") && content.includes(":")) counts.python += 3;
    if (content.includes("class ") && content.includes(":")) counts.python += 3;
    if (content.includes("import ") && !content.includes("from "))
      counts.python += 2;
    if (content.includes("elif ")) counts.python += 3;
    if (content.includes("    ") && content.includes(":")) counts.python += 2;
    if (content.includes("self.")) counts.python += 2;
    if (
      content.includes("None") ||
      content.includes("True") ||
      content.includes("False")
    )
      counts.python += 2;
    if (!content.includes("{") && !content.includes(";")) counts.python += 1;

    // HTML特征
    if (content.includes("<html") || content.includes("<!DOCTYPE"))
      counts.html += 3;
    if (content.includes("<div") || content.includes("</div>"))
      counts.html += 2;
    if (content.includes("<body") || content.includes("</body>"))
      counts.html += 2;
    if ((content.match(/<[^>]+>/g) || []).length > 5) counts.html += 3;
    if (content.includes('class="') || content.includes('id="'))
      counts.html += 2;
    if (content.includes("<script") || content.includes("<style"))
      counts.html += 2;

    // CSS特征
    if (content.includes("{") && content.includes("}") && content.includes(":"))
      counts.css += 3;
    if (content.includes("margin:") || content.includes("padding:"))
      counts.css += 2;
    if (content.includes("color:") || content.includes("background:"))
      counts.css += 2;
    if (content.includes("@media") || content.includes("@keyframes"))
      counts.css += 3;
    if (
      content.includes("px") ||
      content.includes("em") ||
      content.includes("rem")
    )
      counts.css += 2;
    if (content.includes("#") && content.includes("{")) counts.css += 1;
    if (content.includes(".") && content.includes("{")) counts.css += 1;

    // Vue特征
    if (content.includes("<template>") && content.includes("</template>"))
      counts.vue += 3;
    if (content.includes("<script>") && content.includes("</script>"))
      counts.vue += 2;
    if (content.includes("v-if") || content.includes("v-for")) counts.vue += 3;
    if (content.includes("v-model") || content.includes(":")) counts.vue += 2;
    if (content.includes("@click") || content.includes("@input"))
      counts.vue += 2;
    if (content.includes("setup()") || content.includes("computed("))
      counts.vue += 2;
    if (content.includes("ref(") || content.includes("reactive("))
      counts.vue += 2;

    // 找出得分最高的语言
    let maxLang = "javascript";
    let maxScore = counts.javascript;

    for (const [lang, score] of Object.entries(counts)) {
      if (score > maxScore) {
        maxLang = lang;
        maxScore = score;
      }
    }

    return maxLang;
  };

  return {
    highlight,
    highlightCode,
    highlightMarkdown,
    guessLanguage,
  };
}
