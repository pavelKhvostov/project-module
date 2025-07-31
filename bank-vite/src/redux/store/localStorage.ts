export const loadStateFromLocalStorage = (): any => {
  try {
    const rawIds = localStorage.getItem('SelectedAppIds');
    if (!rawIds) return undefined;

    const ids: number[] = JSON.parse(rawIds);
    const lastId = ids[ids.length - 1];
    if (!lastId) return undefined;

    const serializedState = localStorage.getItem(`reduxState__${lastId}`);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('[Redux] Ошибка при загрузке state из localStorage:', error);
    return undefined;
  }
};

export const saveStateToLocalStorage = (state: any) => {
  try {
    const appId = state.application?.applicationId;
    if (!appId) return;

    const stateToSave = {
      application: state.application,
      offers: state.offers,
      scoring: state.scoring,
    };
    localStorage.setItem(`reduxState__${appId}`, JSON.stringify(stateToSave));

    const rawIds = localStorage.getItem('SelectedAppIds');
    const ids: number[] = rawIds ? JSON.parse(rawIds) : [];

    if (!ids.includes(appId)) {
      ids.push(appId);
      localStorage.setItem('SelectedAppIds', JSON.stringify(ids));
    }
  } catch (error) {
    console.error('[Redux] Ошибка при сохранении state в localStorage:', error);
  }
};
