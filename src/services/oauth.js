import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';
import { TOAST_TYPES } from 'components/fragments/toast/toast';

export const redirectToOauthServer = (service, showToast) => {
    const route = getRouteWithID(RouteStore.api.oauth, service);
    AjaxModule.get(route)
        .then((data) => {
            if (data?.url) {
                window.location.replace(data.url);
            }
        }).catch((error) => {
            showToast({ type: TOAST_TYPES.ERROR });
            console.log(error.message);
        });
};
