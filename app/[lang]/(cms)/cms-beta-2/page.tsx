"use client"
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Pencil, Save, Upload, Download } from 'lucide-react';

interface Term {
  original: string;
  title: string;
  slug: string;
  isEditing?: boolean;
}

const SmartGlossaryProcessor = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [input, setInput] = useState('');

  const generateSmartTitle = (term: string): string => {
    const lowerTerm = term.toLowerCase().trim();
    
    // Common plural endings
    const pluralEndings = ['s', 'es', 'ies'];
    // Common collective terms
    const collectiveTerms = ['data', 'equipment', 'software', 'hardware', 'infrastructure', 'information'];
    // Terms that should use "the"
    const useTheTerms = ['process', 'method', 'system', 'framework', 'concept', 'theory', 'principle'];
    // Terms that are always plural
    const alwaysPlural = ['analytics', 'metrics', 'statistics', 'credentials', 'specifications'];
    
    // Check if term starts with "the"
    if (lowerTerm.startsWith('the ')) {
      return `What is ${term}?`;
    }
    
    // Check for always plural terms
    if (alwaysPlural.some(plural => lowerTerm === plural)) {
      return `What are ${term}?`;
    }
    
    // Check for collective terms
    if (collectiveTerms.some(collective => lowerTerm === collective)) {
      return `What is ${term}?`;
    }
    
    // Check if it should use "the"
    if (useTheTerms.some(theWord => lowerTerm.endsWith(theWord))) {
      return `What is the ${term}?`;
    }
    
    // Check for plural forms
    if (
      pluralEndings.some(ending => lowerTerm.endsWith(ending)) &&
      !lowerTerm.endsWith('ss') // Exception for words like "process"
    ) {
      return `What are ${term}?`;
    }
    
    // Check for vowel sound at start
    if (/^[aeiou]/i.test(term)) {
      return `What is an ${term}?`;
    }
    
    // Default case
    return `What is a ${term}?`;
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const processTerms = useCallback((text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const processedTerms = lines.map(term => {
      const title = isAutoMode ? generateSmartTitle(term) : `${term}`;
      return {
        original: term,
        title,
        slug: generateSlug(title),
        isEditing: false
      };
    });
    setTerms(processedTerms);
  }, [isAutoMode]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setInput(text);
      processTerms(text);
    };
    reader.readAsText(file);
  };

  const toggleEdit = (index: number) => {
    setTerms(prev => prev.map((term, i) => 
      i === index ? { ...term, isEditing: !term.isEditing } : term
    ));
  };

  const updateTitle = (index: number, newTitle: string) => {
    setTerms(prev => prev.map((term, i) => 
      i === index ? {
        ...term,
        title: newTitle,
        slug: generateSlug(newTitle),
        isEditing: false
      } : term
    ));
  };

  const handleDownload = () => {
    const content = terms.map(term => `${term.title}\n${term.original}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'processed-terms.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Smart Glossary Processor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Switch
            checked={isAutoMode}
            onCheckedChange={setIsAutoMode}
            id="auto-mode"
          />
          <Label htmlFor="auto-mode">Auto Mode</Label>
          
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
            className="flex items-center gap-2 ml-auto"
          >
            <Upload className="w-4 h-4" />
            Upload Terms
          </Button>
          
          {terms.length > 0 && (
            <Button
              variant="outline"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}
        </div>

        <input
          type="file"
          id="file-upload"
          accept=".txt"
          className="hidden"
          onChange={handleFileUpload}
        />

        {terms.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Original Term</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terms.map((term, index) => (
                <TableRow key={index}>
                  <TableCell>{term.original}</TableCell>
                  <TableCell>
                    {term.isEditing ? (
                      <Input
                        defaultValue={term.title}
                        onBlur={(e) => updateTitle(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            updateTitle(index, e.currentTarget.value);
                          }
                        }}
                        className="w-full"
                      />
                    ) : (
                      term.title
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{term.slug}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleEdit(index)}
                    >
                      {term.isEditing ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Pencil className="w-4 h-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartGlossaryProcessor;