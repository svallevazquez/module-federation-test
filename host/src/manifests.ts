import app1Manifest from 'app1/manifest';
import app2Manifest from 'app2/manifest';

type MicrofrontendManifest = {
	appName: string
	appDisplayName: string
	iconName: string
	hostAppPath: string
	groupName: string
	enabled: boolean
};

const app1DefaultManifest = {
	appName: 'app1',
	appDisplayName: 'Sales Profile',
	iconName: 'SalesMenu',
	hostAppPath: '/app1_profile',
	groupName: 'configuration',
	enabled: false,
};

const app2DefaultManifest = {
	appName: 'app2',
	appDisplayName: 'Vendors Profile',
	iconName: 'VendorsMenu',
	hostAppPath: '/app2_profile',
	groupName: 'configuration',
	enabled: false,
};

console.log('app1Manifest: ', app1Manifest);
console.log('app2Manifest: ', app2Manifest);
export const microfrontendManifests: MicrofrontendManifest[] = [app1Manifest, app2Manifest];
export const microfrontendDefaultManifests: MicrofrontendManifest[] = [app1DefaultManifest, app2DefaultManifest];
