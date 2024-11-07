import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, X } from 'lucide-react'

interface SchemaField {
  name: string
  type: 'string' | 'number' | 'boolean' | 'date' | 'array'
  required: boolean
}

interface BucketSchema {
  name: string
  fields: SchemaField[]
}

function generateTypeScript(schema: BucketSchema): string {
  let output = `interface ${schema.name} {\n`
  schema.fields.forEach(field => {
    output += `  ${field.name}${field.required ? '' : '?'}: ${field.type};\n`
  })
  output += '}\n'
  return output
}

export default function BucketSchemaDialog({ initialSchema }: { initialSchema: BucketSchema }) {
  const [schema, setSchema] = useState<BucketSchema>(initialSchema)
  const [newField, setNewField] = useState<SchemaField>({ name: '', type: 'string', required: false })

  const addField = () => {
    if (newField.name) {
      setSchema({ ...schema, fields: [...schema.fields, newField] })
      setNewField({ name: '', type: 'string', required: false })
    }
  }

  const removeField = (index: number) => {
    const newFields = schema.fields.filter((_, i) => i !== index)
    setSchema({ ...schema, fields: newFields })
  }

  const updateField = (index: number, field: Partial<SchemaField>) => {
    const newFields = schema.fields.map((f, i) => i === index ? { ...f, ...field } : f)
    setSchema({ ...schema, fields: newFields })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Bucket Schema</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{schema.name} Schema</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {schema.fields.map((field, index) => (
            <div key={index} className="grid items-center grid-cols-4 gap-4">
              <Input value={field.name} onChange={(e) => updateField(index, { name: e.target.value })} />
              <Select value={field.type} onValueChange={(value: SchemaField['type']) => updateField(index, { type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Switch id={`required-${index}`} checked={field.required} onCheckedChange={(checked) => updateField(index, { required: checked })} />
                <Label htmlFor={`required-${index}`}>Required</Label>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeField(index)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="grid items-center grid-cols-4 gap-4">
            <Input placeholder="New field name" value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} />
            <Select value={newField.type} onValueChange={(value: SchemaField['type']) => setNewField({ ...newField, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="array">Array</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch id="new-required" checked={newField.required} onCheckedChange={(checked) => setNewField({ ...newField, required: checked })} />
              <Label htmlFor="new-required">Required</Label>
            </div>
            <Button variant="outline" size="icon" onClick={addField}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Generated TypeScript:</h3>
          <pre className="p-2 mt-2 overflow-x-auto bg-gray-100 rounded-md">
            {generateTypeScript(schema)}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}