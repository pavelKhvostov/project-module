export const loadStateFromLocalStorage = (): any => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('[Redux] Ошибка при загрузке state из localStorage:', error);
    return undefined;
  }
};

export const saveStateToLocalStorage = (state: any) => {
  try {
    const stateToSave = {
      application: state.application,
      offers: state.offers,
      scoring: state.scoring,
    };
    localStorage.setItem('reduxState', JSON.stringify(stateToSave));
  } catch (error) {
    console.error('[Redux] Ошибка при сохранении state в localStorage:', error);
  }
};
