import { ComponentProps, ReactNode } from 'react';
import { ScrollView, StyleProp, ViewStyle, ViewToken } from 'react-native';

export type LegendListProps<T> = Omit<ComponentProps<typeof ScrollView>, 'contentOffset'> & {
    data: ArrayLike<any> & T[];
    initialScrollOffset?: number;
    initialScrollIndex?: number;
    drawDistance?: number;
    initialNumContainers?: number;
    recycleItems?: boolean;
    onEndReachedThreshold?: number | null | undefined;
    maintainScrollAtEnd?: boolean;
    maintainScrollAtEndThreshold?: number;
    alignItemsAtEnd?: boolean;
    // in most cases providing a constant value for item size enough
    estimatedItemSize: number;
    // in case you have distinct item sizes, you can provide a function to get the size of an item
    // use instead of FlatList's getItemLayout or FlashList overrideItemLayout
    // if you want to have accurate initialScrollOffset, you should provide this function
    getEstimatedItemSize?: (index: number, item: T) => number;
    onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined;
    keyExtractor?: (item: T, index: number) => string;
    renderItem?: (props: LegendListRenderItemInfo<T>) => ReactNode;
    onViewableRangeChanged?: (range: ViewableRange<T>) => void;
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
    ListHeaderComponentStyle?: StyleProp<ViewStyle> | undefined;
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
    ListFooterComponentStyle?: StyleProp<ViewStyle> | undefined;
    ItemSeparatorComponent?: React.ComponentType<any>;
    //   TODO:
    onViewableItemsChanged?:
        | ((info: { viewableItems: Array<ViewToken<T>>; changed: Array<ViewToken<T>> }) => void)
        | null
        | undefined;
};

export interface ViewableRange<T> {
    startBuffered: number;
    start: number;
    endBuffered: number;
    end: number;
    items: T[];
}

export interface LegendListRenderItemInfo<ItemT> {
    item: ItemT;
    index: number;
}

// Internal type after this line
export type StateType =
    | 'numContainers'
    | `containerIndex${number}`
    | `containerPosition${number}`
    | `numItems`
    | 'totalLength'
    | 'paddingTop'
    | 'stylePaddingTop'
    | 'headerSize'
    | 'footerSize';

export interface StateContext {
    listeners: Map<StateType, () => void>;
    values: Map<StateType, any>;
}

export interface InternalState<T = any> {
    positions: Map<string, number>;
    lengths: Map<String, number>;
    pendingAdjust: number;
    animFrameScroll: number | null;
    animFrameLayout: number | null;
    isStartReached: boolean;
    isEndReached: boolean;
    isAtBottom: boolean;
    idsInFirstRender: Set<string>;
    hasScrolled: boolean;
    scrollLength: number;
    startBuffered: number;
    startNoBuffer: number;
    endBuffered: number;
    endNoBuffer: number;
    scrollPrevious: number;
    scroll: number;
    previousViewableItems: Set<number>;
    scrollBuffer: number;
    props: LegendListProps<T>;
    ctx: StateContext;
}
