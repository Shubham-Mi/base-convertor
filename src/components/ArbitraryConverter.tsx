import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Copy } from 'lucide-react';
import { isValidForBase, convert } from '@/lib/converter';

export function ArbitraryConverter() {
  const [sourceBase, setSourceBase] = useState<number | ''>('');
  const [targetBase, setTargetBase] = useState<number | ''>('');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const isSourceValid = typeof sourceBase === 'number' && sourceBase >= 2 && sourceBase <= 36;
  const isTargetValid = typeof targetBase === 'number' && targetBase >= 2 && targetBase <= 36;
  const output = isSourceValid && isTargetValid ? convert(input, sourceBase, targetBase) : '';

  function handleSourceBaseChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput('');
    setSourceBase(e.target.value === '' ? '' : Number(e.target.value));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (!isSourceValid || isValidForBase(val, sourceBase)) setInput(val);
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
        <Label>From (base 2–36)</Label>
        <Input
          type="number"
          min={2}
          max={36}
          value={sourceBase}
          onChange={handleSourceBaseChange}
          placeholder="e.g. 7"
        />
        {sourceBase !== '' && !isSourceValid && (
          <p className="text-sm text-destructive">Base must be between 2 and 36</p>
        )}
        <Input
          value={input}
          onChange={handleInputChange}
          disabled={!isSourceValid}
          placeholder={isSourceValid ? `Enter base ${sourceBase} number` : 'Enter a valid base first'}
        />
      </div>

      <div className="space-y-3">
        <Label>To (base 2–36)</Label>
        <Input
          type="number"
          min={2}
          max={36}
          value={targetBase}
          onChange={(e) => setTargetBase(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="e.g. 3"
        />
        {targetBase !== '' && !isTargetValid && (
          <p className="text-sm text-destructive">Base must be between 2 and 36</p>
        )}
        <div className="relative">
          <Input value={output} readOnly placeholder="Result" className="pr-10" />
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
