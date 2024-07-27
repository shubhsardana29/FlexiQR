
import fs from 'fs';
import path from 'path';
import { AnalyticsPlugin } from './pluginInterface';

const plugins: Record<string, AnalyticsPlugin> = {};

const pluginsDir = path.join(__dirname, 'implementations');

console.log('Loading plugins from:', pluginsDir);

fs.readdirSync(pluginsDir).forEach(file => {
  if (file.endsWith('.ts') || file.endsWith('.js')) {
    try {
      const fullPath = path.join(pluginsDir, file);
      console.log(`Attempting to load plugin from file: ${fullPath}`);
      
      const imported = require(fullPath);
      const plugin = imported.default || imported;

      if (plugin && typeof plugin.processData === 'function') {
        console.log(`Successfully loaded plugin: ${plugin.name}`);
        plugins[plugin.name] = plugin;
      } else {
        console.warn(`Warning: Plugin ${file} does not implement the AnalyticsPlugin interface correctly.`);
        console.warn('Plugin structure:', JSON.stringify(plugin, null, 2));
      }
    } catch (error) {
      console.error(`Error loading plugin from file ${file}:`, error);
    }
  }
});

console.log('Loaded plugins:', Object.keys(plugins));

export default plugins;