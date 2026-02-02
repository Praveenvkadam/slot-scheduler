export const selectBatchState = (state) => state.batches;

export const selectAllBatches = (state) =>
  selectBatchState(state).items;

export const selectBatchLoading = (state) =>
  selectBatchState(state).loading;

export const selectBatchError = (state) =>
  selectBatchState(state).error;

export const selectBatchGenerated = (state) =>
  selectBatchState(state).generated;

export const selectBatchesByMonthYear =
  (month, year) => (state) =>
    selectAllBatches(state).filter(
      (b) => b.month === month && b.year === year
    );
