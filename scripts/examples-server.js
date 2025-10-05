#!/usr/bin/env node

/**
 * Examples Server
 * 
 * A simple development server for running PowerTimeline examples.
 * This script serves individual examples with hot reloading.
 */

import { createServer } from 'vite';
import { resolve, join } from 'path';
import { existsSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(__dirname, '..');
const examplesDir = join(projectRoot, 'examples');

// Get available examples
function getAvailableExamples() {
  if (!existsSync(examplesDir)) {
    return [];
  }
  
  return readdirSync(examplesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => {
      const examplePath = join(examplesDir, name);
      return existsSync(join(examplePath, 'index.html')) && 
             (existsSync(join(examplePath, 'main.tsx')) || existsSync(join(examplePath, 'main.ts')));
    });
}

// Create Vite config for examples
async function createExampleConfig(exampleName) {
  const examplePath = join(examplesDir, exampleName);
  
  // Import the React plugin dynamically
  const { default: react } = await import('@vitejs/plugin-react');
  
  return {
    root: examplePath,
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(projectRoot, 'src'),
        // Allow examples to import from the source
        '../../src': resolve(projectRoot, 'src'),
      },
    },
    server: {
      port: 3000,
      open: true,
      host: true,
    },
    define: {
      'process.env.NODE_ENV': '"development"',
    },
  };
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const exampleName = args[0];
  
  const availableExamples = getAvailableExamples();
  
  if (!exampleName) {
    console.log('🚀 PowerTimeline Examples Server\n');
    console.log('Usage: npm run examples <example-name>\n');
    console.log('Available examples:');
    availableExamples.forEach(name => {
      console.log(`  - ${name}`);
    });
    console.log('\nOr run all examples with Storybook:');
    console.log('  npm run storybook');
    process.exit(0);
  }
  
  if (!availableExamples.includes(exampleName)) {
    console.error(`❌ Example "${exampleName}" not found.`);
    console.log('\nAvailable examples:');
    availableExamples.forEach(name => {
      console.log(`  - ${name}`);
    });
    process.exit(1);
  }
  
  try {
    console.log(`🚀 Starting example: ${exampleName}`);
    
    const config = await createExampleConfig(exampleName);
    const server = await createServer(config);
    
    await server.listen();
    
    const info = server.config.logger.info;
    const port = server.config.server.port;
    
    console.log(`\n✅ Example "${exampleName}" is running!`);
    console.log(`📱 Local:   http://localhost:${port}`);
    console.log(`🌐 Network: http://0.0.0.0:${port}`);
    console.log('\n💡 Press Ctrl+C to stop the server');
    
  } catch (error) {
    console.error('❌ Failed to start example server:', error);
    process.exit(1);
  }
}

main().catch(console.error);
