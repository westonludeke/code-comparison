import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, FolderOpen, GitCompareArrows, Loader2 } from 'lucide-react';
import { saveCodeSnippet, getSavedSnippets } from '@/api/code-snippets';
import { compareCode } from '@/api/compare';

export function CodeComparison() {
  const [originalCode, setOriginalCode] = useState('');
  const [changedCode, setChangedCode] = useState('');
  const [diffResult, setDiffResult] = useState<Array<{value: string, added?: boolean, removed?: boolean}>>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [snippetName, setSnippetName] = useState('');
  const [savedSnippets, setSavedSnippets] = useState<Array<{_id: string, name: string, code: string}>>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCompare = async () => {
    if (!originalCode || !changedCode) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both original and changed code",
      });
      return;
    }

    try {
      setIsComparing(true);
      setLoading(true);
      const response = await compareCode({ originalCode, changedCode });
      setDiffResult(response.differences);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setIsComparing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!snippetName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a name for your snippet",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await saveCodeSnippet({ name: snippetName, code: originalCode });
      setShowSaveDialog(false);
      setSnippetName('');
      toast({
        title: "Success",
        description: "Code snippet saved successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSnippets = async () => {
    try {
      setLoading(true);
      const { snippets } = await getSavedSnippets();
      setSavedSnippets(snippets);
      setShowLoadDialog(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4">
        <Button 
          onClick={() => setShowSaveDialog(true)}
          variant="outline"
          className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button 
          onClick={loadSnippets}
          variant="outline"
          className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          Load
        </Button>
        <Button 
          onClick={handleCompare}
          className="bg-primary"
        >
          <GitCompareArrows className="mr-2 h-4 w-4" />
          Compare
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="backdrop-blur-sm bg-card/95">
          <CardContent className="p-0">
            <Editor
              height="500px"
              defaultLanguage="javascript"
              value={originalCode}
              onChange={(value) => setOriginalCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on'
              }}
            />
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-card/95">
          <CardContent className="p-0">
            <Editor
              height="500px"
              defaultLanguage="javascript"
              value={changedCode}
              onChange={(value) => setChangedCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on'
              }}
            />
          </CardContent>
        </Card>
      </div>

      {isComparing && diffResult.length > 0 && (
        <Card className="mt-6 backdrop-blur-sm bg-card/95">
          <CardContent className="p-4">
            <ScrollArea className="h-[300px]">
              <pre className="whitespace-pre-wrap">
                {diffResult.map((part, index) => (
                  <span
                    key={index}
                    className={
                      part.added
                        ? "bg-green-500/20 block"
                        : part.removed
                        ? "bg-red-500/20 block"
                        : ""
                    }
                  >
                    {part.value}
                  </span>
                ))}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <DialogHeader>
            <DialogTitle>Save Code Snippet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Snippet Name</Label>
              <Input
                id="name"
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
                placeholder="Enter a name for your snippet"
              />
            </div>
            <Button onClick={handleSave} className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Snippet'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <DialogHeader>
            <DialogTitle>Load Saved Snippet</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : savedSnippets.length === 0 ? (
                <p className="text-center text-muted-foreground">No saved snippets found</p>
              ) : (
                savedSnippets.map((snippet) => (
                  <Button
                    key={snippet._id}
                    variant="outline"
                    className="w-full justify-start hover:bg-accent"
                    onClick={() => {
                      setOriginalCode(snippet.code);
                      setShowLoadDialog(false);
                    }}
                  >
                    {snippet.name}
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}