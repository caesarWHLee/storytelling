import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Parser } from 'htmlparser2'

function parseEmbeddedCode(embeddedCode) {
  const script = {}
  const scripts = []
  let scriptTagStart = false
  const parser = new Parser({
    onopentag: (name, attribs) => {
      if (name === 'script') {
        scriptTagStart = true
        script['attribs'] = attribs
      }
    },
    ontext: (text) => {
      if (scriptTagStart) {
        script['text'] = text
      }
    },
    onclosetag: (tagname) => {
      if (tagname === 'script' && scriptTagStart) {
        scriptTagStart = false
        scripts.push(script)
      }
    },
  })
  parser.write(embeddedCode)
  parser.end()
  return {
    embeddedCodeWithoutScript: embeddedCode.replace(
      /<script(.+?)\/script>/g,
      ''
    ),
    scripts,
  }
}

export const Block = styled.div`
  position: relative;
  /* styles for image link */
  img.img-responsive {
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    display: block;
  }
`

export const Caption = styled.div`
  line-height: 1.43;
  letter-spacing: 0.4px;
  font-size: 14px;
  color: #808080;
  padding: 15px 15px 0 15px;
`

export const EmbeddedCodeBlock = (entity) => {
  const { caption, embeddedCode } = entity.getData()
  const { scripts, embeddedCodeWithoutScript } = parseEmbeddedCode(embeddedCode)
  const embedded = useRef(null)

  useEffect(() => {
    const node = embedded.current
    if (node && Array.isArray(scripts)) {
      const scriptsFragment = new DocumentFragment() // eslint-disable-line no-undef
      scripts.forEach((script) => {
        const scriptEle = document.createElement('script')
        const attribs = script.attribs || []
        for (const prop in attribs) {
          try {
            scriptEle.setAttribute(prop, attribs[prop])
          } catch (err) {
            console.error(
              'Failed to set an attribute to the embbeded script.\n',
              `attribute name: ${prop}\n`,
              `attribute value: ${attribs[prop]}\n`,
              'error:\n',
              err
            )
          }
        }
        scriptEle.text = script.text || ''
        scriptsFragment.appendChild(scriptEle)
      })
      node.appendChild(scriptsFragment)
    }
  })

  return (
    <div>
      <Block
        ref={embedded}
        dangerouslySetInnerHTML={{ __html: embeddedCodeWithoutScript }}
      />
      {caption ? <Caption>{caption}</Caption> : null}
    </div>
  )
}
