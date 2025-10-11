---
title: 'The SceneX Event System'
pubDate: 2025-09-27
description: 'Thoughts about and intent behind the SceneX event system.'
author: 'Gabriel Selzer'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["astro", "blogging", "learning in public"]
---

## Overview

The SceneX event system provides a structured way to handle user interactions (mouse, keyboard, etc.) within 3D/2D scenes. The system is designed around the concept of **event filtering** at specific levels of the scene hierarchy, enabling both high-level application logic and low-level component interactions.

## Architecture

### Event Flow

```
Widget Backend (Qt/WX/etc.) 
    ↓ (convert native events)
Canvas.handle()
    ↓ (route to appropriate view)
View.filter_event()
    ↓ (compute intersections, delegate to nodes)
Node.filter_event() [Camera only]
```

### Core Components

1. **Canvas** - Top-level container that manages multiple views and handles view transitions
2. **View** - Associates a scene with a camera and provides application-level event handling
3. **Camera** - Special node that handles interaction controllers (orbit, pan-zoom, etc.)
4. **Events** - Strongly-typed dataclasses representing different interaction types

## Event Types

The system uses explicit dataclass subclasses for different event types:

```python
@dataclass
class MouseMoveEvent(MouseEvent):
    canvas_pos: tuple[float, float]
    world_ray: Ray
    buttons: MouseButton

@dataclass
class MouseEnterEvent(MouseEvent):
    # Mouse entered a view
    
@dataclass
class MouseLeaveEvent(Event):
    # Mouse left a view or canvas (no position info)
```

## Design Rationale

### Goals

1. **Type Safety** - Explicit event types enable IDE support and catch errors at development time
2. **Flexibility** - Support both simple image viewers and complex 3D applications
3. **Encapsulation** - Controllers can be self-contained and reusable
4. **Performance** - Efficient event routing without unnecessary computations
5. **Multi-view Support** - Handle complex layouts with multiple views per canvas

### Event Filter Placement

#### View-Level Filters ✅
**Use for:** Application logic that needs scene intersection information

```python
def view_filter(event: Event) -> bool:
    if isinstance(event, MouseMoveEvent):
        intersections = event.world_ray.intersections(view.scene)
        # Handle hover effects, pixel value display, etc.
    return False
```

**Benefits:**
- Access to pre-computed world ray and intersection data
- Natural place for application-specific logic
- Handles both intersection and non-intersection events

#### Camera-Level Filters ✅
**Use for:** Interaction controllers (orbit, pan-zoom, etc.)

```python
camera.set_event_filter(OrbitController(center_point))
```

**Benefits:**
- Self-contained, reusable components
- Stateful interaction handling (drag tracking, momentum)
- Independent of scene content

#### Canvas-Level Filters ❌
**Not recommended** - Canvas handles framework-level routing and view transitions

#### Other Node-Level Filters ❌
**Not recommended** - Use view filters with intersection data instead

### View Transition Handling

The Canvas automatically manages mouse enter/leave events when moving between views:

```python
# Mouse moves from View A to View B:
# 1. View A receives MouseLeaveEvent
# 2. View B receives MouseEnterEvent  
# 3. View B receives original MouseMoveEvent
```

This is handled transparently by tracking `_last_mouse_view` state in the Canvas.

## Benefits

### 1. **Clear Separation of Concerns**
- Canvas: Multi-view coordination and routing
- View: Application logic with scene context
- Camera: Reusable interaction controllers

### 2. **Type Safety**
```python
# Compiler/IDE knows the exact event type
if isinstance(event, MouseMoveEvent):
    pos = event.canvas_pos  # IDE autocomplete works
    ray = event.world_ray   # Type hints available
```

### 3. **Efficient Intersection Computation**
- World rays computed once by the Canvas
- Intersection tests performed at the View level
- No duplicate computations for multiple handlers

### 4. **Reusable Controllers**
```python
# Same controller works on any camera
orbit = OrbitController(center=(0, 0, 0))
camera1.set_event_filter(orbit)
camera2.set_event_filter(orbit)
```

## Drawbacks

### 1. **Learning Curve**
- Users must understand the View/Canvas distinction
- Event filtering concepts may be unfamiliar to some developers

### 2. **Manual Intersection Computation**
```python
# Users must call this in view filters
intersections = event.world_ray.intersections(view.scene)
```

### 3. **Limited Node-Level Interaction**
- Cannot directly attach event handlers to Image/Volume/Points nodes
- Must use view-level filtering with intersection logic

### 4. **Multi-View Complexity**
- Canvas-level view transition logic is non-trivial
- Debugging multi-view interactions can be challenging

## Common Patterns

### Image Pixel Value Display
```python
def image_viewer_filter(event: Event) -> bool:
    if isinstance(event, MouseMoveEvent):
        intersections = event.world_ray.intersections(view.scene)
        if intersections:
            node, distance = intersections[0]
            if isinstance(node, snx.Image):
                pos = event.world_ray.point_at_distance(distance)
                # Display pixel value at pos
        else:
            # Clear pixel display
    elif isinstance(event, MouseLeaveEvent):
        # Clear pixel display when leaving view
    return False
```

### 3D Navigation
```python
# Simple orbit controller attachment
view.camera.set_event_filter(OrbitController(center=(0, 0, 0)))

# Custom controller
class CustomController:
    def __call__(self, event: Event, camera: Camera) -> bool:
        if isinstance(event, MousePressEvent):
            # Start drag operation
        elif isinstance(event, MouseMoveEvent):
            # Update camera position
        return event_handled
```

## Future Considerations

### Potential Improvements

1. **Pre-computed Intersections** - Pass intersection results to view filters automatically
2. **Event Bubbling** - Allow events to propagate through scene hierarchy
3. **Gesture Recognition** - Higher-level events for pinch, rotate, etc.
4. **Async Event Handling** - Support for long-running event operations

### Backward Compatibility

Any future changes should maintain compatibility with existing view filters and camera controllers, as these represent the primary user-facing API.

## Conclusion

The current event system prioritizes type safety, clear separation of concerns, and reusable components. While it requires users to understand the View/Canvas distinction and manually compute intersections, it provides a solid foundation for both simple and complex interactive applications.

The design consciously limits event filtering to Views and Cameras, avoiding the complexity and coordination issues that would arise from node-level event handling throughout the scene graph.