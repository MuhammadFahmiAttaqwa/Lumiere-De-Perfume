import { GENDERS } from '@/shared/constants/catalog';
import { UI_TEXT } from '@/shared/constants/uiText';
import { cn } from '@/shared/lib/cn';
import { Icon, type IconName } from '@/shared/ui';
import type { Gender } from '../types';

interface GenderOption {
    value: Gender;
    label: string;
    icon: IconName;
}

const GENDER_OPTIONS: GenderOption[] = [
    { value: GENDERS.women, label: UI_TEXT.catalog.women, icon: 'venus' },
    { value: GENDERS.men, label: UI_TEXT.catalog.men, icon: 'mars' },
];

interface GenderToggleProps {
    value: Gender | null;
    onChange: (gender: Gender | null) => void;
}

export function GenderToggle({ value, onChange }: GenderToggleProps) {
    return (
        <div role="group" aria-label={UI_TEXT.catalog.genderFilter} className="flex items-center gap-6 text-sm">
            {GENDER_OPTIONS.map((option) => {
                const isActive = option.value === value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onChange(isActive ? null : option.value)}
                        className={cn(
                            'flex items-center gap-2 transition-colors',
                            isActive ? 'text-ink' : 'text-muted hover:text-ink',
                        )}
                    >
                        {option.label}
                        <Icon name={option.icon} className="size-4" />
                    </button>
                );
            })}
        </div>
    );
}
