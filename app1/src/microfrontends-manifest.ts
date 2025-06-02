type MicrofrontendManifest = {
	appName: string
	appDisplayName: string
	iconName: string
	hostAppPath: string
	groupName: string
	enabled: boolean
}

const microfrontendsManifest: MicrofrontendManifest = {
	appName: 'app1',
	appDisplayName: 'Sales Profile',
	iconName: 'SalesMenu',
	hostAppPath: '/app1_profile',
	groupName: 'configuration',
	enabled: true,
};

export default microfrontendsManifest;
