import { microfrontendManifests } from '@/manifests';

export const isApp1Active = (): boolean => {
	return microfrontendManifests.some((instance) => instance?.appName === 'app1');
};

export const isApp2Active = (): boolean => {
	return microfrontendManifests.some((instance) => instance?.appName === 'app2');
};

