import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Trash2, Plus, Edit3 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';
import { Button } from '../components/Button';
import { HABIT_COLORS, HABIT_ICONS } from '../utils/constants';
import clsx from 'clsx';
import { getTranslation } from '../utils/i18n';

export const AddEditHabitPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, addHabit, updateHabit, deleteHabit, language, isPremium } = useHabitStore();
  const t = (key: string) => getTranslation(language, key);

  const isEditMode = !!id;
  const existingHabit = isEditMode ? habits.find((h) => h.id === id) : null;

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    color: string;
    icon: string;
    frequency: 'daily' | 'weekly' | 'monthly';
  }>({
    name: '',
    description: '',
    color: HABIT_COLORS[3].value,
    icon: HABIT_ICONS[0].value,
    frequency: 'daily',
  });

  const nameInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingHabit) {
      setFormData({
        name: existingHabit.name,
        description: existingHabit.description,
        color: existingHabit.color,
        icon: existingHabit.icon,
        frequency: existingHabit.frequency,
      });
    }
  }, [existingHabit]);

  // Handle custom validation message
  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity(t('fieldRequired'));
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check form validity and show native validation messages
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!formData.name.trim()) {
      return;
    }

    try {
      if (isEditMode && id) {
        await updateHabit(id, formData);
      } else {
        await addHabit(formData);
      }
      navigate('/');
    } catch (error) {
      // Error is handled in store with toast
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm(t('confirmDelete'))) {
      try {
        await deleteHabit(id);
        navigate('/');
      } catch (error) {
        // Error is handled in store
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[
      iconName.split('-').map((word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('')
    ] || Icons.Circle;
    return IconComponent;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#C85A3E]/10 dark:bg-[#C85A3E]/20 flex items-center justify-center">
              {isEditMode ? (
                <Edit3 size={22} className="text-[#C85A3E]" />
              ) : (
                <Plus size={22} className="text-[#C85A3E]" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {isEditMode ? t('editHabit') : t('addHabit')}
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 ml-13">
            {isEditMode ? t('editHabitDescription') : t('addHabitDescription')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('habitName')} *
          </label>
          <input
            ref={nameInputRef}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onInput={handleInput}
            onInvalid={handleInvalid}
            placeholder={t('habitNamePlaceholder')}
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('description')} ({t('optional')})
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={t('habitDescriptionPlaceholder')}
            rows={3}
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 resize-none"
          />
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('selectColor')}
          </label>
          <div className="flex flex-wrap gap-2">
            {HABIT_COLORS.map((color) => {
              const isLocked = color.isPremium && !isPremium;
              return (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => {
                    if (isLocked) {
                      navigate('/premium');
                    } else {
                      setFormData({ ...formData, color: color.value });
                    }
                  }}
                  className={clsx(
                    'w-12 h-12 rounded-xl transition-all duration-200 relative',
                    formData.color === color.value
                      ? 'ring-3 ring-offset-2 scale-105'
                      : 'hover:scale-105 opacity-80 hover:opacity-100',
                    isLocked && 'cursor-pointer'
                  )}
                  style={{
                    backgroundColor: color.value,
                    ...(formData.color === color.value && {
                      '--tw-ring-color': color.value,
                    } as React.CSSProperties),
                  }}
                >
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                      <Icons.Lock size={16} className="text-white" />
                    </div>
                  )}
                  <span className="sr-only">{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Icon Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('selectIcon')}
          </label>
          <div className="flex flex-wrap gap-2">
            {HABIT_ICONS.map((icon) => {
              const IconComponent = getIconComponent(icon.value);
              const isLocked = icon.isPremium && !isPremium;
              return (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() => {
                    if (isLocked) {
                      navigate('/premium');
                    } else {
                      setFormData({ ...formData, icon: icon.value });
                    }
                  }}
                  className={clsx(
                    'w-12 h-12 rounded-xl border-2 transition-all duration-200 flex items-center justify-center relative',
                    formData.icon === icon.value
                      ? 'border-[#C85A3E] bg-[#C85A3E]/10 dark:bg-[#C85A3E]/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#C85A3E] dark:hover:border-[#C85A3E]',
                    isLocked && 'cursor-pointer'
                  )}
                >
                  <IconComponent
                    size={20}
                    className={
                      formData.icon === icon.value
                        ? 'text-[#C85A3E]'
                        : 'text-gray-600 dark:text-gray-400'
                    }
                  />
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                      <Icons.Lock size={16} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border-2 border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">{t('preview')}</p>
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: formData.color + '15' }}
            >
              {React.createElement(getIconComponent(formData.icon), {
                size: 24,
                color: formData.color,
              })}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                {formData.name || t('habitName')}
              </h3>
              {formData.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 truncate">{formData.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <Button type="submit" variant="primary" fullWidth size="lg">
            <Save size={20} />
            <span>{isEditMode ? t('save') : t('addHabit')}</span>
          </Button>

          {isEditMode && (
            <Button
              type="button"
              variant="danger"
              fullWidth
              size="lg"
              onClick={handleDelete}
            >
              <Trash2 size={20} />
              <span>{t('deleteHabit')}</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
