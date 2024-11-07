"use client"
import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BubbleMenu } from '@tiptap/react'
import { useState } from 'react'

// Toolbar button component
const ToolbarButton = ({ 
  onClick, 
  active = false, 
  children 
}: { 
  onClick: () => void
  active?: boolean
  children: React.ReactNode 
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-100 ${
      active ? 'bg-gray-200' : ''
    }`}
  >
    {children}
  </button>
)

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null
  
  return (
    <div className="flex flex-wrap gap-2 p-2 border-b">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      >
        B
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      >
        I
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
      >
        S
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
      >
        {'</>'}
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
      >
        Code Block
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
      >
        H1
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
      >
        H2
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
      >
        • List
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
      >
        1. List
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
      >
        Quote
      </ToolbarButton>  
    </div>
  )
}

const BubbleMenuComponent = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null

  return (
    <BubbleMenu 
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex gap-1 p-1 bg-white border rounded-lg shadow-lg"
    >
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      >
        B
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      >
        I
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
      >
        S
      </ToolbarButton>
    </BubbleMenu>
  )
}

const TipTapEditor = ({ 
  content = '', 
  onChange 
}: { 
  content?: string
  onChange?: (content: string) => void 
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
  })

  return (
    <div className="w-full max-w-4xl mx-auto border rounded-lg">
      <MenuBar editor={editor} />
      
      <div className="relative min-h-[500px] p-4 prose max-w-none">
        <BubbleMenuComponent editor={editor} />
        <EditorContent editor={editor} />
      </div>
      
    </div>
  )
}

export default TipTapEditor