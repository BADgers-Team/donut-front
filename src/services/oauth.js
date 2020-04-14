import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

export const redirectToOauthServer = (service) => {
    const route = getRouteWithID(RouteStore.api.oauth, service);
    AjaxModule.get(route)
        .then((data) => {
            if (data?.url) {
                window.location.replace(data.url);
            }
        }).catch((error) => {
            console.log(error.message);
        });
};
