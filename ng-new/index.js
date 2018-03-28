"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
function default_1(options) {
    if (!options.name) {
        throw new schematics_1.SchematicsException(`Invalid options, "name" is required.`);
    }
    if (!options.directory) {
        options.directory = options.name;
    }
    const workspaceOptions = {
        name: options.name,
        version: options.version,
        newProjectRoot: options.newProjectRoot || 'projects',
    };
    const applicationOptions = {
        name: options.name,
        inlineStyle: options.inlineStyle,
        inlineTemplate: options.inlineTemplate,
        viewEncapsulation: options.viewEncapsulation,
        routing: options.routing,
        style: options.style,
        skipTests: options.skipTests,
        skipPackageJson: false,
    };
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.empty(), [
            schematics_1.schematic('workspace', workspaceOptions),
            schematics_1.schematic('application', applicationOptions),
            schematics_1.move(options.directory || options.name),
            tree => schematics_1.Tree.optimize(tree),
        ])),
        (host, context) => {
            let packageTask;
            if (!options.skipInstall) {
                packageTask = context.addTask(new tasks_1.NodePackageInstallTask(options.directory));
                if (options.linkCli) {
                    packageTask = context.addTask(new tasks_1.NodePackageLinkTask('@angular/cli', options.directory), [packageTask]);
                }
            }
            if (!options.skipGit) {
                const commit = typeof options.commit == 'object'
                    ? options.commit
                    : (!!options.commit ? {} : false);
                context.addTask(new tasks_1.RepositoryInitializerTask(options.directory, commit), packageTask ? [packageTask] : []);
            }
        },
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3NjaGVtYXRpY3MvYW5ndWxhci9uZy1uZXcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyREFXb0M7QUFDcEMsNERBSTBDO0FBTTFDLG1CQUF5QixPQUFxQjtJQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxnQkFBZ0IsR0FBcUI7UUFDekMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1FBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWMsSUFBSSxVQUFVO0tBQ3JELENBQUM7SUFDRixNQUFNLGtCQUFrQixHQUF1QjtRQUM3QyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1FBQ2hDLGNBQWMsRUFBRSxPQUFPLENBQUMsY0FBYztRQUN0QyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCO1FBQzVDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7UUFDcEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1FBQzVCLGVBQWUsRUFBRSxLQUFLO0tBQ3ZCLENBQUM7SUFFRixNQUFNLENBQUMsa0JBQUssQ0FBQztRQUNYLHNCQUFTLENBQ1Asa0JBQUssQ0FBQyxrQkFBSyxFQUFFLEVBQUU7WUFDYixzQkFBUyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQztZQUN4QyxzQkFBUyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQztZQUM1QyxpQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztZQUN2QyxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztTQUM1QixDQUFDLENBQ0g7UUFDRCxDQUFDLElBQVUsRUFBRSxPQUF5QixFQUFFLEVBQUU7WUFDeEMsSUFBSSxXQUFXLENBQUM7WUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDekIsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSw4QkFBc0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUMzQixJQUFJLDJCQUFtQixDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQzFELENBQUMsV0FBVyxDQUFDLENBQ2QsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sTUFBTSxHQUFHLE9BQU8sT0FBTyxDQUFDLE1BQU0sSUFBSSxRQUFRO29CQUM5QyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU07b0JBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVwQyxPQUFPLENBQUMsT0FBTyxDQUNiLElBQUksaUNBQXlCLENBQzNCLE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLE1BQU0sQ0FDUCxFQUNELFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNqQyxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDO0FBNURELDRCQTREQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBjaGFpbixcbiAgZW1wdHksXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgc2NoZW1hdGljLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBOb2RlUGFja2FnZUluc3RhbGxUYXNrLFxuICBOb2RlUGFja2FnZUxpbmtUYXNrLFxuICBSZXBvc2l0b3J5SW5pdGlhbGl6ZXJUYXNrLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcy90YXNrcyc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgQXBwbGljYXRpb25PcHRpb25zIH0gZnJvbSAnLi4vYXBwbGljYXRpb24vc2NoZW1hJztcbmltcG9ydCB7IFNjaGVtYSBhcyBXb3Jrc3BhY2VPcHRpb25zIH0gZnJvbSAnLi4vd29ya3NwYWNlL3NjaGVtYSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgTmdOZXdPcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zOiBOZ05ld09wdGlvbnMpOiBSdWxlIHtcbiAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgSW52YWxpZCBvcHRpb25zLCBcIm5hbWVcIiBpcyByZXF1aXJlZC5gKTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5kaXJlY3RvcnkpIHtcbiAgICBvcHRpb25zLmRpcmVjdG9yeSA9IG9wdGlvbnMubmFtZTtcbiAgfVxuXG4gIGNvbnN0IHdvcmtzcGFjZU9wdGlvbnM6IFdvcmtzcGFjZU9wdGlvbnMgPSB7XG4gICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgIHZlcnNpb246IG9wdGlvbnMudmVyc2lvbixcbiAgICBuZXdQcm9qZWN0Um9vdDogb3B0aW9ucy5uZXdQcm9qZWN0Um9vdCB8fCAncHJvamVjdHMnLFxuICB9O1xuICBjb25zdCBhcHBsaWNhdGlvbk9wdGlvbnM6IEFwcGxpY2F0aW9uT3B0aW9ucyA9IHtcbiAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgaW5saW5lU3R5bGU6IG9wdGlvbnMuaW5saW5lU3R5bGUsXG4gICAgaW5saW5lVGVtcGxhdGU6IG9wdGlvbnMuaW5saW5lVGVtcGxhdGUsXG4gICAgdmlld0VuY2Fwc3VsYXRpb246IG9wdGlvbnMudmlld0VuY2Fwc3VsYXRpb24sXG4gICAgcm91dGluZzogb3B0aW9ucy5yb3V0aW5nLFxuICAgIHN0eWxlOiBvcHRpb25zLnN0eWxlLFxuICAgIHNraXBUZXN0czogb3B0aW9ucy5za2lwVGVzdHMsXG4gICAgc2tpcFBhY2thZ2VKc29uOiBmYWxzZSxcbiAgfTtcblxuICByZXR1cm4gY2hhaW4oW1xuICAgIG1lcmdlV2l0aChcbiAgICAgIGFwcGx5KGVtcHR5KCksIFtcbiAgICAgICAgc2NoZW1hdGljKCd3b3Jrc3BhY2UnLCB3b3Jrc3BhY2VPcHRpb25zKSxcbiAgICAgICAgc2NoZW1hdGljKCdhcHBsaWNhdGlvbicsIGFwcGxpY2F0aW9uT3B0aW9ucyksXG4gICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgfHwgb3B0aW9ucy5uYW1lKSxcbiAgICAgICAgdHJlZSA9PiBUcmVlLm9wdGltaXplKHRyZWUpLFxuICAgICAgXSksXG4gICAgKSxcbiAgICAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgICAgbGV0IHBhY2thZ2VUYXNrO1xuICAgICAgaWYgKCFvcHRpb25zLnNraXBJbnN0YWxsKSB7XG4gICAgICAgIHBhY2thZ2VUYXNrID0gY29udGV4dC5hZGRUYXNrKG5ldyBOb2RlUGFja2FnZUluc3RhbGxUYXNrKG9wdGlvbnMuZGlyZWN0b3J5KSk7XG4gICAgICAgIGlmIChvcHRpb25zLmxpbmtDbGkpIHtcbiAgICAgICAgICBwYWNrYWdlVGFzayA9IGNvbnRleHQuYWRkVGFzayhcbiAgICAgICAgICAgIG5ldyBOb2RlUGFja2FnZUxpbmtUYXNrKCdAYW5ndWxhci9jbGknLCBvcHRpb25zLmRpcmVjdG9yeSksXG4gICAgICAgICAgICBbcGFja2FnZVRhc2tdLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghb3B0aW9ucy5za2lwR2l0KSB7XG4gICAgICAgIGNvbnN0IGNvbW1pdCA9IHR5cGVvZiBvcHRpb25zLmNvbW1pdCA9PSAnb2JqZWN0J1xuICAgICAgICAgID8gb3B0aW9ucy5jb21taXRcbiAgICAgICAgICA6ICghIW9wdGlvbnMuY29tbWl0ID8ge30gOiBmYWxzZSk7XG5cbiAgICAgICAgY29udGV4dC5hZGRUYXNrKFxuICAgICAgICAgIG5ldyBSZXBvc2l0b3J5SW5pdGlhbGl6ZXJUYXNrKFxuICAgICAgICAgICAgb3B0aW9ucy5kaXJlY3RvcnksXG4gICAgICAgICAgICBjb21taXQsXG4gICAgICAgICAgKSxcbiAgICAgICAgICBwYWNrYWdlVGFzayA/IFtwYWNrYWdlVGFza10gOiBbXSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LFxuICBdKTtcbn1cbiJdfQ==