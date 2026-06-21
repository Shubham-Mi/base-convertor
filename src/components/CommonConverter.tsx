import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDown, Check, Copy } from 'lucide-react';
import { isValidForBase, convert } from '@/lib/converter';

const BASES = [
  { label: 'Binary', value: 2 },
  { label: 'Octal', value: 8 },
  { label: 'Decimal', value: 10 },
  { label: 'Hex', value: 16 },
];

export function CommonConverter() {
  const [sourceBase, setSourceBase] = useState(10);
  const [targetBase, setTargetBase] = useState(2);
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = convert(input, sourceBase, targetBase);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (isValidForBase(val, sourceBase)) setInput(val);
  }

  function handleSourceBaseChange(base: number) {
    setSourceBase(base);
    setInput('');
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>From</Label>
        <div className="flex gap-2">
          {BASES.map((b) => (
            <Button
              key={b.value}
              variant={sourceBase === b.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSourceBaseChange(b.value)}
            >
              {b.label}
            </Button>
          ))}
        </div>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={`Enter base ${sourceBase} number`}
          className="font-mono"
        />
      </div>

      <div className="flex justify-center text-muted-foreground">
        <ArrowDown className="h-4 w-4" />
      </div>

      <div className="space-y-3">
        <Label>To</Label>
        <div className="flex gap-2">
          {BASES.map((b) => (
            <Button
              key={b.value}
              variant={targetBase === b.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTargetBase(b.value)}
            >
              {b.label}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Input value={output} readOnly placeholder="Result" className="pr-10 font-mono bg-muted" />
          <button
            onClick={handleCopy}
            disabled={!output}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
            aria-label="Copy result"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
