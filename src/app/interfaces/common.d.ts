type NonUndefined<T> = T extends undefined ? never : T;

type Nullable<T> = T | null | undefined;

type DayNumber = IntRange<1, 32>;
type MonthNumber = IntRange<1, 13>;

type Position = 'left' | 'right' | 'top' | 'bottom';
type Size = 'xs' | 'sm' | 'md' | 'lg';
type Color = 'primary' | 'success' | 'neutral' | 'master' | 'info' | 'help' | 'danger' | 'warning' | 'alert';
type StyleType = 'plain' | 'soft' | 'solid' | 'outline';
type Background = 'main' | 'secondary' | 'tertiary';
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type InfoType = 'info' | 'question' | 'success' | 'warning' | 'error';

type Icon = 'i-info' | 'i-question' | 'i-success' | 'i-warning' | 'i-error';
