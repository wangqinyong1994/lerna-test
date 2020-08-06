import React, { useState } from 'react';
import { ListView, PullToRefresh, ActivityIndicator } from 'antd-mobile';
import Exception from '@/components/Exception';
import classnames from 'classnames';
import styles from './index.less';

const cx = classnames.bind(styles);

interface Noop {
  [key: string]: any;
}

interface ListViewProps {
  dataSource: any;
  isLoading: boolean;
  renderRow?: any;
  separator?: (...args) => React.ReactElement;
  renderHeader?: (...args) => React.ReactElement;
  renderFooter?: (...args) => React.ReactElement;
  renderBodyComponent?: any;
  onEndReached?: (event) => any;
  onScroll?: ((e?: any) => void) | undefined;
  onRefresh?: (fn: Function) => any;
  className?: string;
  pageSize?: number;
  errorType?: number;
}

const TQListView = ({
  dataSource,
  isLoading,
  onEndReached,
  className,
  pageSize = 10,
  onScroll,
  renderHeader,
  renderRow,
  renderBodyComponent,
  onRefresh,
  errorType,
}: Partial<ListViewProps>): React.ReactElement => {
  const [refreshing, setRefreshing] = useState(false);

  const separator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F2F3F5',
        height: 20,
      }}
    />
  );

  const listClassName = cx('am-list', className);

  const ExceptionProps = {
    type: errorType,
    errRefresh(fn: Function) {
      setTimeout(() => {
        fn();
      }, 2000);
    },
    errReload(fn: Function) {
      setTimeout(() => {
        fn();
      }, 2000);
    },
  };

  const ExceptionDom = <Exception {...ExceptionProps} />;
  if (
    isLoading &&
    (!dataSource ||
      !dataSource.rowIdentities ||
      !dataSource.rowIdentities.length)
  ) {
    return (
      <div className={styles.loading}>
        <ActivityIndicator
          toast
          text="加载中..."
          animating={errorType === 3 || errorType === undefined}
        />
      </div>
    );
  }
  if (
    !dataSource ||
    !dataSource.rowIdentities.length ||
    !dataSource.rowIdentities[0] ||
    !dataSource.rowIdentities[0].length
  ) {
    return ExceptionDom;
  }

  return (
    <ListView
      dataSource={dataSource}
      renderHeader={renderHeader}
      renderFooter={() => (
        <div style={{ padding: 30, textAlign: 'center' }}>
          {isLoading ? '加载中...' : '已经到底了~'}
        </div>
      )}
      renderBodyComponent={renderBodyComponent}
      renderRow={renderRow}
      renderSeparator={separator}
      className={listClassName}
      pageSize={pageSize}
      scrollRenderAheadDistance={500}
      onEndReached={onEndReached}
      onEndReachedThreshold={10}
      onScroll={onScroll}
      style={{
        overflow: 'auto',
      }}
      pullToRefresh={
        <PullToRefresh
          direction="down"
          distanceToRefresh={25}
          damping={60}
          refreshing={refreshing}
          onRefresh={() => {
            if (onRefresh) {
              onRefresh(() => {
                setRefreshing(false);
              });
            }
          }}
        ></PullToRefresh>
      }
    />
  );
};

export default TQListView;
