import React from 'react';

const FontShowcase = () => {
  const fonts = [
    {
      name: 'Oswald Light',
      className: 'font-sans font-light',
      description: 'Oswald轻体，适合副标题和说明文字',
      example: 'OSWALD LIGHT STYLE',
    },
    {
      name: 'Oswald Regular',
      className: 'font-sans font-normal',
      description: 'Oswald常规体，适合正文内容',
      example: 'OSWALD REGULAR STYLE',
    },
    {
      name: 'Oswald Medium',
      className: 'font-sans font-medium',
      description: 'Oswald中等粗细，适合小标题',
      example: 'OSWALD MEDIUM STYLE',
    },
    {
      name: 'Oswald SemiBold',
      className: 'font-sans font-semibold',
      description: 'Oswald半粗体，适合重要信息',
      example: 'OSWALD SEMIBOLD STYLE',
    },
    {
      name: 'Oswald Bold',
      className: 'font-sans font-bold',
      description: 'Oswald粗体，适合主标题',
      example: 'OSWALD BOLD STYLE',
    },
    {
      name: 'Oswald ExtraBold',
      className: 'font-sans font-extrabold',
      description: 'Oswald超粗体，适合强调标题',
      example: 'OSWALD EXTRABOLD STYLE',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h2 className="mb-12 text-center font-sans text-4xl font-bold text-gray-800">
        OSWALD 字体展示
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {fonts.map((font, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
          >
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                {font.name}
              </h3>
              <p className="mb-4 text-sm text-gray-600">{font.description}</p>
            </div>

            <div className="space-y-3">
              <div
                className={`${font.className} text-3xl font-bold text-gray-800`}
              >
                {font.example}
              </div>

              <div className={`${font.className} text-xl text-gray-700`}>
                The quick brown fox jumps over the lazy dog
              </div>

              <div className={`${font.className} text-lg text-gray-600`}>
                1234567890 !@#$%^&*()
              </div>
            </div>

            <div className="mt-4 rounded bg-gray-50 p-3">
              <code className="text-sm text-gray-700">
                className=&quot;{font.className}&quot;
              </code>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-blue-50 p-6">
        <h3 className="mb-4 text-xl font-bold text-blue-800">
          OSWALD 字体使用建议：
        </h3>
        <ul className="space-y-2 text-blue-700">
          <li>
            • <strong>主标题</strong>：使用 Bold 或 ExtraBold 创造强烈视觉冲击
          </li>
          <li>
            • <strong>副标题</strong>：Medium 或 SemiBold 提供层次感
          </li>
          <li>
            • <strong>正文</strong>：Regular 确保良好的可读性
          </li>
          <li>
            • <strong>说明文字</strong>：Light 适合辅助信息
          </li>
          <li>
            • <strong>品牌特色</strong>：Oswald
            的现代感和强烈个性适合科技、运动、时尚等领域
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FontShowcase;
